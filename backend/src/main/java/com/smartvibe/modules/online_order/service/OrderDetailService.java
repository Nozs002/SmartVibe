package com.smartvibe.modules.online_order.service;

import org.springframework.stereotype.Service;
import com.smartvibe.modules.online_order.entity.OrderDetail;
import com.smartvibe.modules.online_order.repository.OrderDetailRepository;
import com.smartvibe.modules.online_order.dto.OrderDetailDTO;
import com.smartvibe.modules.product.dto.ProductDTO;

import lombok.RequiredArgsConstructor;
import java.util.*;


@Service
@RequiredArgsConstructor
public class OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;

    public List<OrderDetailDTO> getOrderDetailsByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderIdAndGroupByProductId(orderId);
    }
}
