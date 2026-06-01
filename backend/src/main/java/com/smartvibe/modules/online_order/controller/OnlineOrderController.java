package com.smartvibe.modules.online_order.controller;

import com.smartvibe.modules.online_order.dto.OnlineOrder;
import com.smartvibe.modules.online_order.dto.OrderResponse;
import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.online_order.service.OnlineOrderService;

import lombok.RequiredArgsConstructor;

import java.util.*;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/online_order")
@RequiredArgsConstructor
public class OnlineOrderController {
    private final OnlineOrderService onlineOrderService;

    @PostMapping("/create")
    public ApiResponse<OnlineOrder> createOrder(@RequestBody OnlineOrder onlineOrder) {
        ApiResponse<OnlineOrder> response = new ApiResponse<>();
        OnlineOrder createdOrder = onlineOrderService.createOrder(onlineOrder);
        response.setResult(createdOrder);
        return response;
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/customer")
    public ApiResponse<List<OrderResponse>> viewOrder(@RequestParam Long id){
        ApiResponse<List<OrderResponse>> response = new ApiResponse<>();
        List<OrderResponse> orderList = onlineOrderService.getOrderList(id);
        response.setResult(orderList);
        return response;
    }

    @PreAuthorize("hasRole('SALES') or hasRole('MANAGER')")
    @GetMapping("/branch")
    public ApiResponse<List<OrderResponse>> viewOrdersByBranch(@RequestParam Long id){
        ApiResponse<List<OrderResponse>> response = new ApiResponse<>();
        List<OrderResponse> orderList = onlineOrderService.getOrdersByBranchId(id);
        response.setResult(orderList);
        return response;
    }

    @PreAuthorize("hasRole('SALES') or hasRole('MANAGER') or hasRole('CUSTOMER')")
    @PutMapping("/{id}/status")
    public ApiResponse<String> updateOrderStatus(
            @PathVariable("id") Long id, 
            @RequestParam("status") String newStatus) {
        
        ApiResponse<String> response = new ApiResponse<>();
        onlineOrderService.updateOrderStatus(id, newStatus);
        
        response.setResult("Cập nhật trạng thái thành công!");
        return response;
    }

    @PreAuthorize("hasRole('SALES') or hasRole('MANAGER')")
    @PutMapping("/{id}/payment_status")
    public ApiResponse<String> updatePaymentStatus(
            @PathVariable("id") Long id, 
            @RequestParam("status") String newPaymentStatus) {
        
        ApiResponse<String> response = new ApiResponse<>();
        onlineOrderService.updatePaymentStatus(id, newPaymentStatus);
        
        response.setResult("Cập nhật trạng thái thanh toán thành công!");
        return response;
    }
}
