package com.smartvibe.modules.stock_transfer.service;

import com.smartvibe.modules.stock_transfer.dto.TransferRequestDTO;
import com.smartvibe.modules.stock_transfer.entity.StockTransfer;
import com.smartvibe.modules.stock_transfer.entity.StockTransferDetail;
import com.smartvibe.modules.stock_transfer.repository.StockTransferDetailRepository;
import com.smartvibe.modules.stock_transfer.repository.StockTransferRepository;
import com.smartvibe.modules.inventory.entity.Inventory;
import com.smartvibe.modules.inventory_transaction.entity.InventoryTransaction;
import com.smartvibe.modules.product.entity.ProductItem;

import com.smartvibe.modules.inventory.repository.InventoryRepository;
import com.smartvibe.modules.inventory_transaction.repository.InventoryTransactionRepository;
import com.smartvibe.modules.product.repository.ProductItemRepository;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockTransferService {

    private final StockTransferRepository stockTransferRepository;
    private final StockTransferDetailRepository stockTransferDetailRepository;
    private final InventoryRepository inventoryRepository;
    private final ProductItemRepository productItemRepository;
    private final InventoryTransactionRepository inventoryTransactionRepository;

    // KIỂM TRA ĐIỀU KIỆN KHO TỔNG (ID = 1)
    private void validateHeadWarehouse(Long staffBranchId) {
        if (staffBranchId == null || staffBranchId != 1) {
            throw new AppException(ErrorCode.UNAUTHORIZED_BRANCH_TRANSFER); 
        }
    }

    // KHỞI TẠO PHIẾU ĐIỀU CHUYỂN NHÁP (PENDING)
    @Transactional(rollbackFor = Exception.class)
    public void createTransferTicket(Long staffBranchId, TransferRequestDTO request) {
        validateHeadWarehouse(staffBranchId);

        StockTransfer transfer = StockTransfer.builder()
                .status("pending")
                .fromBranchId(request.getFromBranchId())
                .toBranchId(request.getToBranchId())
                .build();
        transfer = stockTransferRepository.save(transfer);

        List<StockTransferDetail> detailsToSave = new ArrayList<>();

        for (TransferRequestDTO.TransferItemDTO item : request.getItems()) {
            if (item.isSerialized()) {
                for (String serial : item.getSerials()) {
                    StockTransferDetail detail = StockTransferDetail.builder()
                            .transferId(transfer.getId())
                            .productId(item.getProductId())
                            .quantity(1L)
                            .productItemSerial(serial)
                            .build();
                    detailsToSave.add(detail);
                }
            } else {
                StockTransferDetail detail = StockTransferDetail.builder()
                        .transferId(transfer.getId())
                        .productId(item.getProductId())
                        .quantity(item.getQuantity())
                        .productItemSerial(null)
                        .build();
                detailsToSave.add(detail);
            }
        }
        stockTransferDetailRepository.saveAll(detailsToSave);
    }

    // BÊN XUẤT BẤM GỬI HÀNG: PENDING -> SHIPPING (TRỪ KHO XUẤT)
    @Transactional(rollbackFor = Exception.class)
    public void shipTransfer(Long staffBranchId, Long transferId) {
        validateHeadWarehouse(staffBranchId);

        StockTransfer transfer = stockTransferRepository.findById(transferId)
                .orElseThrow(() -> new AppException(ErrorCode.DOCUMENT_NOT_FOUND));

        if (!"pending".equals(transfer.getStatus())) {
            throw new AppException(ErrorCode.INVALID_DOCUMENT_STATUS);
        }

        transfer.setStatus("shipping");
        stockTransferRepository.save(transfer);

        List<StockTransferDetail> details = stockTransferDetailRepository.findByTransferId(transferId);

        for (StockTransferDetail detail : details) {
            // Trừ số dư bảng Tồn Kho của chi nhánh XUẤT
            Inventory fromInv = inventoryRepository.findByProductIdAndBranchId(detail.getProductId(), transfer.getFromBranchId())
                    .orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));

            if (fromInv.getQuantityAvailable() < detail.getQuantity()) {
                throw new AppException(ErrorCode.PRODUCT_STOCK_NOT_ENOUGH);
            }
            fromInv.setQuantityAvailable(fromInv.getQuantityAvailable() - detail.getQuantity());
            inventoryRepository.save(fromInv);

            // Ghi Log giao dịch Xuất điều chuyển ('transfer out')
            inventoryTransactionRepository.save(InventoryTransaction.builder()
                    .inventoryId(fromInv.getId())
                    .transactionType("transfer out")
                    .quantityChanged(-detail.getQuantity())
                    .referenceType("stock transfer")
                    .referenceId(transferId)
                    .build());

            // Nếu có hàng định danh Serial, bốc máy rời khỏi kho xuất (Tạm thời đặt status trung gian)
            if (detail.getProductItemSerial() != null) {
                ProductItem item = productItemRepository.findById(detail.getProductItemSerial())
                        .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
                item.setStatus("transit"); 
                item.setBranchId(null); // Rời kho vật lý cũ, đang trên đường đi
                productItemRepository.save(item);
            }
        }
    }

    // BÊN NHẬN XÁC NHẬN: SHIPPING -> COMPLETED (CỘNG KHO NHẬN)
    @Transactional(rollbackFor = Exception.class)
    public void completeTransfer(Long staffBranchId, Long transferId) {
        validateHeadWarehouse(staffBranchId);

        StockTransfer transfer = stockTransferRepository.findById(transferId)
                .orElseThrow(() -> new AppException(ErrorCode.DOCUMENT_NOT_FOUND));

        if (!"shipping".equals(transfer.getStatus())) {
            throw new AppException(ErrorCode.INVALID_DOCUMENT_STATUS);
        }

        transfer.setStatus("completed");
        transfer.setCompletedAt(LocalDateTime.now());
        stockTransferRepository.save(transfer);

        List<StockTransferDetail> details = stockTransferDetailRepository.findByTransferId(transferId);

        for (StockTransferDetail detail : details) {
            // Cộng số dư bảng Tồn Kho của chi nhánh NHẬN
            Inventory toInv = inventoryRepository.findByProductIdAndBranchId(detail.getProductId(), transfer.getToBranchId())
                    .orElseGet(() -> Inventory.builder()
                            .productId(detail.getProductId())
                            .branchId(transfer.getToBranchId())
                            .quantityAvailable(0L)
                            .build());

            toInv.setQuantityAvailable(toInv.getQuantityAvailable() + detail.getQuantity());
            toInv = inventoryRepository.save(toInv);

            // Ghi Log giao dịch Nhận điều chuyển ('transfer in')
            inventoryTransactionRepository.save(InventoryTransaction.builder()
                    .inventoryId(toInv.getId())
                    .transactionType("transfer in")
                    .quantityChanged(detail.getQuantity())
                    .referenceType("stock transfer")
                    .referenceId(transferId)
                    .build());

            // Tiếp quản các máy Serial vào kho nhận mới
            if (detail.getProductItemSerial() != null) {
                ProductItem item = productItemRepository.findById(detail.getProductItemSerial())
                        .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
                item.setStatus("in stock");
                item.setBranchId(transfer.getToBranchId()); // Cập bến kho mới thành công
                productItemRepository.save(item);
            }
        }
    }
}