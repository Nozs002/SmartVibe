package com.smartvibe.modules.inventory_transaction.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.smartvibe.modules.inventory_transaction.repository.InventoryTransactionRepository;
import com.smartvibe.modules.inventory_transaction.dto.InventoryTransactionDTO;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryTransactionService {
    private final InventoryTransactionRepository inventoryTransactionRepository;
    
    public List<InventoryTransactionDTO> getHistoryByBranch(Long branchId) {
        return inventoryTransactionRepository.findHistoryByBranch(branchId);
    }
}
