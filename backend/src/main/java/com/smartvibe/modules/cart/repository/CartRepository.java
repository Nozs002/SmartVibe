package com.smartvibe.modules.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartvibe.modules.cart.entity.Cart;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByCustomerId(Long customerId);
}
