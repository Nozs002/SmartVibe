package com.smartvibe.modules.online_order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smartvibe.modules.online_order.dto.OrderDetailDTO;
import com.smartvibe.modules.online_order.entity.OrderDetail;

import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    @Query("SELECT new com.smartvibe.modules.online_order.dto.OrderDetailDTO(p.id, SUM(od.quantity), MAX(od.price), p.name) " +
           "FROM OrderDetail od JOIN Product p ON od.productId = p.id " +
           "WHERE od.orderId = :orderId GROUP BY od.productId, p.name")
    List<OrderDetailDTO> findByOrderIdAndGroupByProductId(@Param("orderId") Long orderId);
}
