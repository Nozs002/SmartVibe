package com.smartvibe.modules.pos.service;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.inventory.entity.Inventory;
import com.smartvibe.modules.inventory.repository.InventoryRepository;
import com.smartvibe.modules.inventory.service.InventoryService;
import com.smartvibe.modules.inventory_transaction.entity.InventoryTransaction;
import com.smartvibe.modules.inventory_transaction.repository.InventoryTransactionRepository;
import com.smartvibe.modules.online_order.entity.Order;
import com.smartvibe.modules.online_order.entity.OrderDetail;
import com.smartvibe.modules.online_order.repository.OrderDetailRepository;
import com.smartvibe.modules.online_order.repository.OrderRepository;
import com.smartvibe.modules.pos.dto.PosOrderItemRequest;
import com.smartvibe.modules.pos.dto.PosOrderRequest;
import com.smartvibe.modules.product.entity.ProductItem;
import com.smartvibe.modules.product.repository.ProductItemRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PosOrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final InventoryService inventoryService;
    private final ProductItemRepository productItemRepository;
    private final InventoryRepository inventoryRepository;
    private final InventoryTransactionRepository inventoryTransactionRepository;

    @Transactional(rollbackFor = Exception.class)
    public Order createPosOrder(PosOrderRequest request) {
        
        // 1. Tạo đơn hàng POS
        Order order = Order.builder()
                .type("POS")
                .orderStatus("completed")
                .paymentStatus("paid") 
                .deliveryStatus("delivered")
                .paymentMethod(request.getPaymentMethod())
                .staffId(request.getStaffId())
                .customerId(request.getCustomerId()!= null ? request.getCustomerId() : 1L)
                .branchId(request.getBranchId())
                .discountPercent(request.getDiscountPercent() != null ? request.getDiscountPercent() : BigDecimal.ZERO)
                .shippingFee(BigDecimal.ZERO)
                .note(request.getNote())
                .build();

        Order savedOrder = orderRepository.save(order);

        List<OrderDetail> orderDetails = new ArrayList<>();
        List<ProductItem> productItemsToUpdate = new ArrayList<>();
        List<Inventory> inventoriesToUpdate = new ArrayList<>();
        List<InventoryTransaction> transactionsToSave = new ArrayList<>();

        for (PosOrderItemRequest item : request.getItems()) {
            
            if (item.getProductSerial() != null && !item.getProductSerial().trim().isEmpty()) {
                
                ProductItem productItem = productItemRepository.findBySerial(item.getProductSerial())
                        .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

                if (!"in stock".equals(productItem.getStatus())) {
                    throw new AppException(ErrorCode.PRODUCT_OUT_OF_STOCK); 
                }


                productItem.setStatus("sold");
                productItemsToUpdate.add(productItem);

                Long currentBranchId = request.getBranchId();
                Inventory inv = inventoryRepository.findByProductIdAndBranchId(item.getProductId(), currentBranchId)
                        .orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));

                if (inv.getQuantityAvailable() < 1) {
                    throw new AppException(ErrorCode.PRODUCT_STOCK_NOT_ENOUGH);
                }

                inv.setQuantityAvailable(inv.getQuantityAvailable() - 1);
                inventoriesToUpdate.add(inv);

                InventoryTransaction transaction = InventoryTransaction.builder()
                        .inventoryId(inv.getId())
                        .transactionType("sale")
                        .quantityChanged(-1L)
                        .referenceType("order")
                        .referenceId(savedOrder.getId())
                        .build();
                transactionsToSave.add(transaction);

                OrderDetail detail = OrderDetail.builder()
                        .orderId(savedOrder.getId())
                        .productId(item.getProductId())
                        .quantity(1L) // Serial là duy nhất
                        .price(item.getPrice())
                        .productSerial(item.getProductSerial())
                        .build();
                orderDetails.add(detail);

            } else {
                inventoryService.deductInventory(item.getProductId(), item.getQuantity(), savedOrder.getId(), "order");

                OrderDetail detail = OrderDetail.builder()
                        .orderId(savedOrder.getId())
                        .productId(item.getProductId())
                        .quantity((long) item.getQuantity())
                        .price(item.getPrice())
                        .productSerial(null) 
                        .build();
                orderDetails.add(detail);
            }
        }

        orderDetailRepository.saveAll(orderDetails);
        
        if (!productItemsToUpdate.isEmpty()) {
            productItemRepository.saveAll(productItemsToUpdate);
        }
        if (!inventoriesToUpdate.isEmpty()) {
            inventoryRepository.saveAll(inventoriesToUpdate);
        }
        if (!transactionsToSave.isEmpty()) {
            inventoryTransactionRepository.saveAll(transactionsToSave);
        }

        return savedOrder;
    }
}