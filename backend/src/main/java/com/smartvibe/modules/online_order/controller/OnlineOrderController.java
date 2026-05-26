package com.smartvibe.modules.online_order.controller;

import com.smartvibe.modules.online_order.dto.OnlineOrder;
import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.online_order.service.OnlineOrderService;
import lombok.RequiredArgsConstructor;

import java.util.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
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
}
