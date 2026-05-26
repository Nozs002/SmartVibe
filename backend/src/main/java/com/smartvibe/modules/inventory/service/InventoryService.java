package com.smartvibe.modules.inventory.service;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.inventory.dto.ProductInventory;
import com.smartvibe.modules.inventory.entity.Inventory;
import com.smartvibe.modules.inventory.repository.InventoryRepository;

import java.util.*;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    // Trừ tồn kho của sản phẩm
    public void deductInventory(Long productId, long quantityToDeduct) {
        List<Inventory> inventories = inventoryRepository.findByProductIdOrderByQuantityAvailableDesc(productId);
        List<Inventory> inventoriesToUpdate = new ArrayList<>();

        long remainingQuantity = quantityToDeduct;

        // Trừ dần số lượng qua từng chi nhánh
        for (Inventory inv : inventories) {
            if (remainingQuantity <= 0)
                break;

            long available = inv.getQuantityAvailable() != null ? inv.getQuantityAvailable() : 0L;

            if (available > 0) {
                long deductAmount = Math.min(available, remainingQuantity);

                inv.setQuantityAvailable(available - deductAmount);
                inventoriesToUpdate.add(inv);
                remainingQuantity -= deductAmount;
            }
        }

        // Chốt chặn an toàn: Đề phòng có giao dịch khác mua mất hàng ngay trong lúc
        if (remainingQuantity > 0) {
            throw new AppException(ErrorCode.PRODUCT_STOCK_NOT_ENOUGH);
        }

        inventoryRepository.saveAll(inventoriesToUpdate);
    }
}
