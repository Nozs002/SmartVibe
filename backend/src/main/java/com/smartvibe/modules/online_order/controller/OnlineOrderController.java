package com.smartvibe.modules.online_order.controller;

import com.smartvibe.modules.online_order.dto.OnlineOrder;
import com.smartvibe.modules.online_order.dto.OrderResponse;
import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.online_order.service.OnlineOrderService;

import lombok.RequiredArgsConstructor;

import java.util.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

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

    @GetMapping("/customer")
    public ApiResponse<List<OrderResponse>> viewOrder(@RequestParam Long id){
        ApiResponse<List<OrderResponse>> response = new ApiResponse<>();
        List<OrderResponse> orderList = onlineOrderService.getOrderList(id);
        response.setResult(orderList);
        return response;
    }
}
