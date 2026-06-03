package com.smartvibe.modules.document.service;

import com.smartvibe.modules.inventory.dto.ImportRequestDTO;
import com.smartvibe.modules.document.entity.StockDocument;
import com.smartvibe.modules.document.entity.StockDocumentDetail;
import com.smartvibe.modules.inventory.entity.Inventory;
import com.smartvibe.modules.inventory_transaction.entity.InventoryTransaction;
import com.smartvibe.modules.product.entity.ProductItem;

import com.smartvibe.modules.document.repository.StockDocumentRepository;
import com.smartvibe.modules.document.repository.StockDocumentDetailRepository;
import com.smartvibe.modules.inventory.repository.InventoryRepository;
import com.smartvibe.modules.inventory_transaction.repository.InventoryTransactionRepository;
import com.smartvibe.modules.product.repository.ProductItemRepository;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class StockDocumentService {

    private final StockDocumentRepository stockDocumentRepository;
    private final StockDocumentDetailRepository stockDocumentDetailRepository;
    private final InventoryRepository inventoryRepository;
    private final ProductItemRepository productItemRepository;
    private final InventoryTransactionRepository inventoryTransactionRepository;

    @Transactional(rollbackFor = Exception.class)
    public void importStock(ImportRequestDTO request) {
        
        // Tạo chứng từ nhập kho gốc
        StockDocument document = StockDocument.builder()
                .type("import")
                .status("completed")
                .branchId(request.getBranchId())
                .staffId(request.getStaffId())
                .note(request.getNote())
                .build();
        document = stockDocumentRepository.save(document);

        List<StockDocumentDetail> detailsToSave = new ArrayList<>();
        List<ProductItem> productItemsToSave = new ArrayList<>();
        List<Inventory> inventoriesToUpdate = new ArrayList<>();
        List<InventoryTransaction> transactionsToSave = new ArrayList<>();

        for (ImportRequestDTO.ImportItemDTO item : request.getItems()) {
            Long productId = item.getProductId();
            Long qty = item.getQuantity();

            if (item.isSerialized()) {
                List<String> inputSerials = item.getSerials();
                
                if (inputSerials == null || inputSerials.size() != qty) {
                    throw new AppException(ErrorCode.SERIAL_QUANTITY_MISMATCH);
                }

                for (String serial : inputSerials) {
                    if (productItemRepository.existsBySerial(serial)) {
                        throw new AppException(ErrorCode.SERIAL_ALREADY_EXISTS);
                    }

                    ProductItem productItem = ProductItem.builder()
                            .serial(serial)
                            .status("in stock")
                            .productId(productId)
                            .branchId(request.getBranchId())
                            .build();
                    productItemsToSave.add(productItem);

                    StockDocumentDetail detail = StockDocumentDetail.builder()
                            .documentId(document.getId())
                            .productId(productId)
                            .quantity(1L)
                            .price(item.getPrice())
                            .productItemSerial(serial)
                            .build();
                    detailsToSave.add(detail);
                }
            } 
            else {
                StockDocumentDetail detail = StockDocumentDetail.builder()
                        .documentId(document.getId())
                        .productId(productId)
                        .quantity(qty)
                        .price(item.getPrice())
                        .productItemSerial(null)
                        .build();
                detailsToSave.add(detail);
            }

            Inventory inv = inventoryRepository.findByProductIdAndBranchId(productId, request.getBranchId())
                    .orElse(null);

            if (inv == null) {
                inv = Inventory.builder()
                        .productId(productId)
                        .branchId(request.getBranchId())
                        .quantityAvailable(0L)
                        .build();
                inv = inventoryRepository.save(inv); 
            } else {
                inventoriesToUpdate.add(inv);
            }

            inv.setQuantityAvailable(inv.getQuantityAvailable() + qty);

            // Tạo lịch sử biến động kho (Inventory Transaction)
            InventoryTransaction transaction = InventoryTransaction.builder()
                    .inventoryId(inv.getId())
                    .transactionType("import") 
                    .quantityChanged(qty)
                    .referenceType("document") 
                    .referenceId(document.getId())
                    .build();
            transactionsToSave.add(transaction);
        }

        // Lưu đồng bộ tất cả xuống database
        if (!detailsToSave.isEmpty()) stockDocumentDetailRepository.saveAll(detailsToSave);
        if (!productItemsToSave.isEmpty()) productItemRepository.saveAll(productItemsToSave);
        if (!inventoriesToUpdate.isEmpty()) inventoryRepository.saveAll(inventoriesToUpdate);
        if (!transactionsToSave.isEmpty()) inventoryTransactionRepository.saveAll(transactionsToSave);
    }

    // NHÂN VIÊN TẠO PHIẾU XUẤT (PENDING)
    @Transactional(rollbackFor = Exception.class)
    public void createExportRequest(ImportRequestDTO request) {
        StockDocument document = StockDocument.builder()
                .type("export")
                .status("pending")
                .branchId(request.getBranchId())
                .staffId(request.getStaffId())
                .note(request.getNote())
                .build();
        document = stockDocumentRepository.save(document);

        List<StockDocumentDetail> detailsToSave = new ArrayList<>();

        for (ImportRequestDTO.ImportItemDTO item : request.getItems()) {
            Long productId = item.getProductId();
            Long qty = item.getQuantity();

            if (item.isSerialized()) {
                List<String> inputSerials = item.getSerials();
                if (inputSerials == null || (long) inputSerials.size() != qty) {
                    throw new AppException(ErrorCode.SERIAL_QUANTITY_MISMATCH);
                }

                for (String serial : inputSerials) {
                    // Kiểm tra xem máy này có thực sự đang nằm ở chi nhánh này và "in stock" không
                    ProductItem productItem = productItemRepository.findById(serial)
                            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
                    
                    if (!"in stock".equalsIgnoreCase(productItem.getStatus()) || !productItem.getBranchId().equals(request.getBranchId())) {
                        throw new AppException(ErrorCode.INVALID_PRODUCT_ITEM_STATUS);
                    }

                    StockDocumentDetail detail = StockDocumentDetail.builder()
                            .documentId(document.getId())
                            .productId(productId)
                            .quantity(1L)
                            .price(item.getPrice())
                            .productItemSerial(serial)
                            .build();
                    detailsToSave.add(detail);
                }
            } else {
                Inventory inv = inventoryRepository.findByProductIdAndBranchId(productId, request.getBranchId())
                        .orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
                
                if (inv.getQuantityAvailable() < qty) {
                    throw new AppException(ErrorCode.PRODUCT_STOCK_NOT_ENOUGH);
                }

                StockDocumentDetail detail = StockDocumentDetail.builder()
                        .documentId(document.getId())
                        .productId(productId)
                        .quantity(qty)
                        .price(item.getPrice())
                        .productItemSerial(null)
                        .build();
                detailsToSave.add(detail);
            }
        }
        if (!detailsToSave.isEmpty()) {
            stockDocumentDetailRepository.saveAll(detailsToSave);
        }
    }

    // QUẢN LÝ PHÊ DUYỆT PHIẾU XUẤT KHO
    @Transactional(rollbackFor = Exception.class)
    public void approveExportDocument(Long documentId) {
        StockDocument document = stockDocumentRepository.findById(documentId)
                .orElseThrow(() -> new AppException(ErrorCode.DOCUMENT_NOT_FOUND));

        if (!"pending".equalsIgnoreCase(document.getStatus()) || !"export".equalsIgnoreCase(document.getType())) {
            throw new AppException(ErrorCode.INVALID_DOCUMENT_STATUS);
        }

        document.setStatus("completed");
        stockDocumentRepository.save(document);

        // Lấy danh sách chi tiết mặt hàng cần xuất
        List<StockDocumentDetail> details = stockDocumentDetailRepository.findByDocumentId(documentId);
        
        List<ProductItem> productItemsToUpdate = new ArrayList<>();
        List<Inventory> inventoriesToUpdate = new ArrayList<>();
        List<InventoryTransaction> transactionsToSave = new ArrayList<>();

        // Gom nhóm hàng không serial để trừ kho 1 lần
        Map<Long, Long> normalProductQtyMap = new HashMap<>();

        for (StockDocumentDetail detail : details) {
            Long productId = detail.getProductId();

            if (detail.getProductItemSerial() != null) {
                Optional<ProductItem> productItemOpt = productItemRepository.findBySerial(detail.getProductItemSerial());
                if (!productItemOpt.isPresent()) {
                    throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
                }
                ProductItem productItem = productItemOpt.get();
                productItem.setStatus("sold");
                productItemsToUpdate.add(productItem);

                // Trừ tồn kho từng máy lẻ
                Inventory inv = inventoryRepository.findByProductIdAndBranchId(productId, document.getBranchId())
                        .orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
                
                inv.setQuantityAvailable(inv.getQuantityAvailable() - 1L);
                inventoriesToUpdate.add(inv);

                // Tạo giao dịch xuất kho đơn lẻ
                InventoryTransaction tx = InventoryTransaction.builder()
                        .inventoryId(inv.getId())
                        .transactionType("export")
                        .quantityChanged(-1L)
                        .referenceType("document")
                        .referenceId(documentId)
                        .build();
                transactionsToSave.add(tx);
            } else {
                // Gom số lượng hàng thường
                normalProductQtyMap.put(productId, normalProductQtyMap.getOrDefault(productId, 0L) + detail.getQuantity());
            }
        }

        // Thực hiện trừ kho hàng thường
        for (Map.Entry<Long, Long> entry : normalProductQtyMap.entrySet()) {
            Long productId = entry.getKey();
            Long exportQty = entry.getValue();

            Inventory inv = inventoryRepository.findByProductIdAndBranchId(productId, document.getBranchId())
                    .orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));

            if (inv.getQuantityAvailable() < exportQty) {
                throw new AppException(ErrorCode.PRODUCT_STOCK_NOT_ENOUGH);
            }

            inv.setQuantityAvailable(inv.getQuantityAvailable() - exportQty);
            inventoriesToUpdate.add(inv);

            InventoryTransaction tx = InventoryTransaction.builder()
                    .inventoryId(inv.getId())
                    .transactionType("export")
                    .quantityChanged(-exportQty)
                    .referenceType("document")
                    .referenceId(documentId)
                    .build();
            transactionsToSave.add(tx);
        }

        if (!productItemsToUpdate.isEmpty()) productItemRepository.saveAll(productItemsToUpdate);
        if (!inventoriesToUpdate.isEmpty()) inventoryRepository.saveAll(inventoriesToUpdate);
        if (!transactionsToSave.isEmpty()) inventoryTransactionRepository.saveAll(transactionsToSave);
    }
}