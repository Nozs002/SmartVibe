package com.smartvibe.modules.online_order.service;

import com.smartvibe.modules.online_order.dto.OnlineOrder;
import com.smartvibe.modules.online_order.dto.OrderDetailDTO;
import com.smartvibe.modules.online_order.dto.OrderResponse;
import com.smartvibe.modules.cart.dto.CartItemDTO;
import com.smartvibe.modules.online_order.repository.OrderRepository;
import com.smartvibe.modules.cart.repository.CartItemRepository;
import com.smartvibe.modules.inventory.repository.InventoryRepository;
import com.smartvibe.modules.inventory.dto.ProductInventory;
import com.smartvibe.modules.inventory.entity.Inventory;
import com.smartvibe.modules.product.dto.ProductDTO;
import com.smartvibe.modules.product.entity.ProductItem;
import com.smartvibe.modules.product.repository.ProductItemRepository;
import com.smartvibe.modules.online_order.entity.OrderDetail;
import com.smartvibe.modules.online_order.repository.OrderDetailRepository;
import org.springframework.transaction.annotation.Transactional;
import com.smartvibe.modules.inventory.service.InventoryService;
import com.smartvibe.modules.inventory_transaction.repository.
InventoryTransactionRepository;
import com.smartvibe.modules.inventory_transaction.entity.InventoryTransaction;
import com.smartvibe.modules.inventory_transaction.repository.InventoryTransactionRepository;

import org.springframework.util.CollectionUtils;
import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.online_order.entity.Order;
import java.util.Map;
import java.math.BigDecimal;


import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OnlineOrderService {
    private final OrderRepository orderRepository;
    private final InventoryRepository inventoryRepository;
    private final ProductItemRepository productItemRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final CartItemRepository cartItemRepository;
    private final InventoryService inventoryService;
    private final OrderDetailService orderDetailService;
    private final InventoryTransactionRepository inventoryTransactionRepository;

    public boolean checkOrder(List<CartItemDTO> cartDTO, List<ProductInventory> productInventory) {
        Map<Long, Long> productQuantityMap = productInventory.stream().collect(
                Collectors.toMap(ProductInventory::getProductId, ProductInventory::getQuantityAvailable, Long::sum));
        for (CartItemDTO item : cartDTO) {
            // kiểm tra số lượng sản phẩm có đủ không
            Long productId = item.getProductDTO().getId();
            Long availableQuantity = productQuantityMap.getOrDefault(productId, 0L);

            if (availableQuantity < item.getQuantity()) {
                throw new AppException(ErrorCode.PRODUCT_STOCK_NOT_ENOUGH);
            }
        }
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    public OnlineOrder createOrder(OnlineOrder onlineOrder) {
        // tìm danh sách id của sản phẩm trong giỏ hàng
        List<Long> productIds = onlineOrder.getCartItemDTO().stream().map(CartItemDTO::getProductDTO)
                .map(ProductDTO::getId).collect(Collectors.toList());

        List<ProductInventory> productInventoryList;

        if (CollectionUtils.isEmpty(productIds)) {
            throw new AppException(ErrorCode.CART_ITEMS_EMPTY);
        } else {

            productInventoryList = inventoryRepository.findAllByProductIdIn(productIds);
        }
        // kiểm tra số lượng sản phẩm có đủ không
        checkOrder(onlineOrder.getCartItemDTO(), productInventoryList);

        Order order = Order.builder().type("online").note(onlineOrder.getNote())
                .deliveryLocation(onlineOrder.getDeliveryLocation()).phone(onlineOrder.getPhone())
                .orderStatus("pending").deliveryStatus("not shipped").accountPayment(null)
                .paymentMethod(onlineOrder.getPaymentMethod()).paymentStatus("unpaid")
                .discountPercent(onlineOrder.getDiscountPercent()).customerId(onlineOrder.getCustomer().getId())
                .shippingProvider(onlineOrder.getShippingProvider()).trackingCode(null)
                .shippingFee(onlineOrder.getShippingFee()).customerName(onlineOrder.getCustomerName()).branchId(1L)
                .build();
        String shippingProvider = onlineOrder.getShippingProvider();

        if (order.getShippingFee() == null) {
            order.setShippingFee(BigDecimal.ZERO);
        }

        switch (shippingProvider) {
        case "GHTK":
            order.setShippingFee(BigDecimal.valueOf(60000));
            break;
        case "ViettelPost":
            order.setShippingFee(BigDecimal.valueOf(80000));
            break;
        case "GHN":
            order.setShippingFee(BigDecimal.valueOf(100000));
            break;
        default:
            break;
        }

        String typeCustomer = onlineOrder.getCustomer().getType();

        switch (typeCustomer) {
        case "normal":
            order.setDiscountPercent(BigDecimal.valueOf(0.0));
            order.setShippingFee(order.getShippingFee().multiply(BigDecimal.valueOf(1.0)));
            break;
        case "vip":
            order.setDiscountPercent(BigDecimal.valueOf(0.0));
            order.setShippingFee(order.getShippingFee().multiply(BigDecimal.valueOf(0.7)));
            break;
        case "gold":
            order.setDiscountPercent(BigDecimal.valueOf(2.0));
            order.setShippingFee(order.getShippingFee().multiply(BigDecimal.valueOf(0.5)));
            break;
        case "diamond":
            order.setDiscountPercent(BigDecimal.valueOf(5.0));
            order.setShippingFee(BigDecimal.valueOf(0.0));
            break;
        default:
            break;
        }

        if (onlineOrder.getPaymentMethod().equals("bank")) {
            order.setAccountPayment("03647247695 MB Bank");
            order.setPaymentMethod("bank");
        }
        order = orderRepository.save(order);
        OnlineOrder createdOrder = OnlineOrder.builder().id(order.getId()).type(order.getType()).note(order.getNote())
                .deliveryLocation(order.getDeliveryLocation()).phone(order.getPhone())
                .orderStatus(order.getOrderStatus()).deliveryStatus(order.getDeliveryStatus())
                .accountPayment(order.getAccountPayment()).paymentMethod(order.getPaymentMethod())
                .paymentStatus(order.getPaymentStatus()).discountPercent(order.getDiscountPercent())
                .customer(onlineOrder.getCustomer()).shippingProvider(order.getShippingProvider())
                .trackingCode(order.getTrackingCode()).shippingFee(order.getShippingFee())
                .customerName(order.getCustomerName()).build();
        createOrderDetailandRemoveCartItems(onlineOrder.getCartItemDTO(), order.getId());
        return createdOrder;
    }

    public void createOrderDetailandRemoveCartItems(List<CartItemDTO> cartDTO, Long orderId) {
        List<OrderDetail> orderDetailsToSave = new ArrayList<>();
        List<ProductItem> productItemsToUpdate = new ArrayList<>();
        List<Long> cartItemIdsToRemove = new ArrayList<>();
        List<Inventory> inventoriesToUpdate = new ArrayList<>();
        List<InventoryTransaction> transactionsToSave = new ArrayList<>();

        for (CartItemDTO item : cartDTO) {
            Long productId = item.getProductDTO().getId();
            int quantity = item.getQuantity();
            BigDecimal price = item.getProductDTO().getPrice();

            if (item.getProductDTO().isSerialized()) {
                // Hàm đã chạy vào đây
                System.out.println("====================================== Có tại serial");
                List<ProductItem> availableItems = productItemRepository.findByProductIdAndStatus(productId, "in stock",
                        PageRequest.of(0, quantity));
                System.out.println("====================================== Số lượng hàng có sẵn: " + availableItems.size());

                if (availableItems.size() < quantity) {
                    throw new AppException(ErrorCode.NOT_ENOUGH_SERIALS);
                }
 
                // Key = branchId, Value = số lượng bị lấy
                Map<Long, Long> branchDeductCount = availableItems.stream()
                        .collect(Collectors.groupingBy(ProductItem::getBranchId, Collectors.counting()));

                // TRỪ TỒN KHO TỪNG CHI NHÁNH
                for (Map.Entry<Long, Long> entry : branchDeductCount.entrySet()) {
                    Long branchId = entry.getKey();
                    long deductQty = entry.getValue();

                    Inventory inv = inventoryRepository.findByProductIdAndBranchId(productId, branchId)
                            .orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));

                    if (inv.getQuantityAvailable() < deductQty) {
                        throw new AppException(ErrorCode.PRODUCT_STOCK_NOT_ENOUGH);
                    }

                    inv.setQuantityAvailable(inv.getQuantityAvailable() - deductQty);
                    inventoriesToUpdate.add(inv);

                    InventoryTransaction transaction = InventoryTransaction.builder()
                            .inventoryId(inv.getId())
                            .transactionType("sale")
                            .quantityChanged(-deductQty)
                            .referenceType("order")
                            .referenceId(orderId)
                            .build();
                    transactionsToSave.add(transaction);
                }

                // Tạo OrderDetail và Update trạng thái Serial
                for (ProductItem productItem : availableItems) {
                    OrderDetail detail = OrderDetail.builder().orderId(orderId).productId(productId).quantity(1L)
                            .price(price).productSerial(productItem.getSerial()).build();
                    orderDetailsToSave.add(detail);

                    productItem.setStatus("sold");
                    productItemsToUpdate.add(productItem);
                }

            } else {
                System.out.println("====================================== Không có serial");
                System.out.println("====================================== Sản phẩm có id là: " + productId + " và số lượng là: " + quantity);
                inventoryService.deductInventory(productId, quantity, orderId, "order");

                // Tạo OrderDetail cho sản phẩm không Serial
                OrderDetail detail = OrderDetail.builder().orderId(orderId).productId(productId)
                        .quantity((long) quantity).price(price).productSerial(null).build();
                orderDetailsToSave.add(detail);
            }

            // Thêm Danh sách giỏ hàng cần xóa
            cartItemIdsToRemove.add(item.getId());
        }

        orderDetailRepository.saveAll(orderDetailsToSave);

        if (!productItemsToUpdate.isEmpty()) {
            productItemRepository.saveAll(productItemsToUpdate);
        }
        if (!inventoriesToUpdate.isEmpty())
            inventoryRepository.saveAll(inventoriesToUpdate);
        if (!transactionsToSave.isEmpty()) {
            inventoryTransactionRepository.saveAll(transactionsToSave);
        }
        cartItemRepository.deleteAllById(cartItemIdsToRemove);
    }

    public List<OrderResponse> getOrderList(Long id) {
        List<Order> orders = orderRepository.findByCustomerId(id);
        List<OrderResponse> orderResponses = new ArrayList<>();

        for (Order order : orders) {
            List<OrderDetailDTO> detailResponses = orderDetailService.getOrderDetailsByOrderId(order.getId());

            OrderResponse response = OrderResponse.builder().id(order.getId()).type(order.getType())
                    .createdAt(order.getCreatedAt()).note(order.getNote()).deliveryLocation(order.getDeliveryLocation())
                    .phone(order.getPhone()).orderStatus(order.getOrderStatus())
                    .deliveryStatus(order.getDeliveryStatus()).accountPayment(order.getAccountPayment())
                    .paymentMethod(order.getPaymentMethod()).paymentStatus(order.getPaymentStatus())
                    .discountPercent(order.getDiscountPercent()).shippingProvider(order.getShippingProvider())
                    .trackingCode(order.getTrackingCode()).shippingFee(order.getShippingFee())
                    .customerName(order.getCustomerName()).orderDetailDTO(detailResponses).build();

            orderResponses.add(response);
        }
        return orderResponses;
    }

    public List<OrderResponse> getOrdersByBranchId(Long id) {
        List<OrderResponse> orderResponses = orderRepository.findByBranchId(id);

        for (OrderResponse orderResponse : orderResponses) {
            List<OrderDetailDTO> detailResponses = orderDetailService.getOrderDetailsByOrderId(orderResponse.getId());
            orderResponse.setOrderDetailDTO(detailResponses);
        }
        return orderResponses;
    }

    @Transactional
    public void updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        if ("cancelled".equalsIgnoreCase(newStatus) && !"cancelled".equalsIgnoreCase(order.getOrderStatus())) {
            
            List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(orderId);
            
            List<ProductItem> productItemsToUpdate = new ArrayList<>();
            List<Inventory> inventoriesToUpdate = new ArrayList<>();
            List<InventoryTransaction> transactionsToSave = new ArrayList<>();

            // Dùng Map để gom nhóm tổng số lượng cần hoàn trả theo từng ProductId
            Map<Long, Long> productReturnMap = new HashMap<>();

            for (OrderDetail detail : orderDetails) {
                Long productId = detail.getProductId();
                Long quantity = detail.getQuantity() != null ? detail.getQuantity() : 1L;

                // Cộng dồn số lượng hàng cần hoàn trả cho productId này
                productReturnMap.put(productId, productReturnMap.getOrDefault(productId, 0L) + quantity);

                if (detail.getProductSerial() != null) {
                    ProductItem productItem = productItemRepository.findBySerial(detail.getProductSerial()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
                    
                    productItem.setStatus("in stock");
                    productItem.setBranchId(1L);
                    
                    productItemsToUpdate.add(productItem);
                }
            }

            // cộng lại tồn kho và ghi lại transaction
            Long targetBranchId = 1L;

            for (Map.Entry<Long, Long> entry : productReturnMap.entrySet()) {
                Long productId = entry.getKey();
                Long returnQty = entry.getValue();

                Inventory inv = inventoryRepository.findByProductIdAndBranchId(productId, targetBranchId)
                        .orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));

                inv.setQuantityAvailable(inv.getQuantityAvailable() + returnQty);
                inventoriesToUpdate.add(inv);

                InventoryTransaction returnTx = InventoryTransaction.builder()
                        .inventoryId(inv.getId())
                        .transactionType("return") 
                        .quantityChanged(returnQty)
                        .referenceType("order") 
                        .referenceId(orderId)
                        .build();
                transactionsToSave.add(returnTx);
            }

            if (!productItemsToUpdate.isEmpty()) {
                productItemRepository.saveAll(productItemsToUpdate);
            }
            if (!inventoriesToUpdate.isEmpty()) {
                inventoryRepository.saveAll(inventoriesToUpdate);
            }
            if (!transactionsToSave.isEmpty()) {
                inventoryTransactionRepository.saveAll(transactionsToSave);
            }
        }

        order.setOrderStatus(newStatus);
        orderRepository.save(order);
    }

    @Transactional
    public void updatePaymentStatus(Long orderId, String newPaymentStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setPaymentStatus(newPaymentStatus);
        orderRepository.save(order);
    }
}
