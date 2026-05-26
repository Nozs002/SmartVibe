package com.smartvibe.modules.online_order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartvibe.modules.online_order.entity.OrderDetail;

import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    
}
