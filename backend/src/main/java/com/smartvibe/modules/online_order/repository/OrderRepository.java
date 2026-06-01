package com.smartvibe.modules.online_order.repository;

import com.smartvibe.modules.online_order.entity.Order;
import com.smartvibe.modules.online_order.dto.OrderResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId);

    @Query("SELECT new com.smartvibe.modules.online_order.dto.OrderResponse(" 
    + "o.id, o.createdAt, o.type, o.note, o.deliveryLocation, o.phone, o.orderStatus, o.deliveryStatus, o.accountPayment, o.paymentMethod, o.paymentStatus, o.discountPercent, " 
    + "new com.smartvibe.modules.staff.dto.StaffDTO(s.id, s.type, s.workStatus), "
    + "new com.smartvibe.modules.customer.dto.CustomerDTO(c.id, c.type, c.userId), " 
    + "new com.smartvibe.modules.branch.dto.BranchDTO(b.id, b.name, b.address, b.phone, b.email, b.operatingStatus, b.type, b.numberOfStaff, b.capacity), " 
    + "o.customerName, o.shippingProvider, o.trackingCode, o.shippingFee) " 
    + "FROM Order o " 
    + "LEFT JOIN Customer c ON o.customerId = c.id " 
    + "LEFT JOIN Branch b ON o.branchId = b.id " 
    + "LEFT JOIN Staff s ON o.staffId = s.id " 
    + "WHERE o.branchId = :branchId")
    List<OrderResponse> findByBranchId(@Param("branchId") Long branchId);
}
