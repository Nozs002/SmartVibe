package com.smartvibe.modules.inventory.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.service.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.inventory.service.InventoryService;
import com.smartvibe.modules.inventory.dto.InventoryDTO;

import java.util.List;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

    @PreAuthorize("hasRole('SALES') or hasRole('MANAGER') or hasRole('WAREHOUSE')")
    @GetMapping("/all")
    public ApiResponse<List<InventoryDTO>> getAllInventories() {
        ApiResponse<List<InventoryDTO>> response = new ApiResponse<>();
        response.setResult(inventoryService.getAllInventories());
        return response;
    }

    @GetExchange("/{productId}")
    public ApiResponse<List<InventoryDTO>> getAvailableStockByProductId(@PathVariable Long productId) {
        ApiResponse<List<InventoryDTO>> response = new ApiResponse<>();
        response.setResult(inventoryService.getAvailableStockByProductId(productId));
        return response;
    }
}
