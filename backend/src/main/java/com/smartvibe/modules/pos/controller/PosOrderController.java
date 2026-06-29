package com.smartvibe.modules.pos.controller;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.online_order.entity.Order;
import com.smartvibe.modules.pos.dto.PosOrderRequest;
import com.smartvibe.modules.pos.service.PosOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pos/orders")
@RequiredArgsConstructor
public class PosOrderController {

    private final PosOrderService posOrderService;

    @PostMapping
    public ApiResponse<Order> createPosOrder(@RequestBody PosOrderRequest request) {
        Order result = posOrderService.createPosOrder(request);
        return ApiResponse.<Order>builder().result(result).build();
    }
}