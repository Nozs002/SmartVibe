package com.smartvibe.modules.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smartvibe.modules.cart.entity.CartItem;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // Tìm tất cả các CartItem theo cartId
    @Query("SELECT c, p FROM CartItem c JOIN Product p ON c.productId = p.id WHERE c.cartId = :cartId")
    List<Object[]> findAllByCartIdWithProduct(@Param("cartId") Long cartId);

    // Tìm CartItem theo id
    Optional<CartItem> findById(Long id);
}
