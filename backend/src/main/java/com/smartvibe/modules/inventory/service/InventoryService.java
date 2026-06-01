package com.smartvibe.modules.inventory.service;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.inventory.dto.ProductInventory;
import com.smartvibe.modules.inventory.entity.Inventory;
import com.smartvibe.modules.inventory.repository.InventoryRepository;
import com.smartvibe.modules.inventory_transaction.entity.InventoryTransaction;
import com.smartvibe.modules.inventory.dto.InventoryDTO;
import com.smartvibe.modules.inventory_transaction.repository.InventoryTransactionRepository;
import jakarta.transaction.Transactional;

import java.util.*;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final InventoryTransactionRepository inventoryTransactionRepository;

    // Trừ tồn kho của sản phẩm
    @Transactional
    public void deductInventory(Long productId, long quantityToDeduct, Long referenceId, String referenceType) {
        List<Inventory> inventories = inventoryRepository.findByProductIdOrderByQuantityAvailableDesc(productId);
        List<Inventory> inventoriesToUpdate = new ArrayList<>();
        List<InventoryTransaction> transactionsToSave = new ArrayList<>();

        long remainingQuantity = quantityToDeduct;

        // Trừ dần số lượng qua từng chi nhánh
        for (Inventory inv : inventories) {
            if (remainingQuantity <= 0) break;

            long available = inv.getQuantityAvailable() != null ? inv.getQuantityAvailable() : 0L;

            if (available > 0) {
                long deductAmount = Math.min(available, remainingQuantity);

                inv.setQuantityAvailable(available - deductAmount);
                inventoriesToUpdate.add(inv);
                
                // TẠO LOG GIAO DỊCH
                InventoryTransaction transaction = InventoryTransaction.builder()
                        .inventoryId(inv.getId())
                        .transactionType("sale") 
                        .quantityChanged(-deductAmount) 
                        .referenceType(referenceType) 
                        .referenceId(referenceId)     
                        .build();
                transactionsToSave.add(transaction);

                remainingQuantity -= deductAmount;
            }
        }

        // Kiểm tra nếu quét hết kho mà vẫn không đủ hàng
        if (remainingQuantity > 0) {
            throw new AppException(ErrorCode.PRODUCT_STOCK_NOT_ENOUGH);
        }

        // Lưu kho và log
        inventoryRepository.saveAll(inventoriesToUpdate);
        inventoryTransactionRepository.saveAll(transactionsToSave);
    }

    public List<InventoryDTO> getAllInventories() {
        return inventoryRepository.findAllInventoryDTOs();
    }

    public List<InventoryDTO> getAvailableStockByProductId(Long productId) {
        return inventoryRepository.getAvailableStockByProductId(productId);
    }
}

