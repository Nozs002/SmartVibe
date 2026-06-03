package com.smartvibe.modules.inventory_transaction.controller;

import org.springframework.web.service.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.inventory_transaction.service.InventoryTransactionService;
import com.smartvibe.modules.inventory_transaction.dto.InventoryTransactionDTO;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/inventory-transactions")
@RequiredArgsConstructor
public class InventoryTransactionController {
    private final InventoryTransactionService transactionService;

    @GetMapping("/branch/{branchId}")
    public ApiResponse<List<InventoryTransactionDTO>> getHistoryByBranch(@PathVariable Long branchId) {
        List<InventoryTransactionDTO> history = transactionService.getHistoryByBranch(branchId);
        ApiResponse<List<InventoryTransactionDTO>> response = new ApiResponse<>();
        response.setResult(history);
        return response;
    }
}
