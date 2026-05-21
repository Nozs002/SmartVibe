package com.smartvibe.modules.cart.service;

import com.smartvibe.modules.product.repository.ProductRepository;
import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.cart.dto.CartItemDTO;
import com.smartvibe.modules.cart.entity.Cart;
import com.smartvibe.modules.cart.entity.CartItem;
import com.smartvibe.modules.cart.repository.CartItemRepository;
import com.smartvibe.modules.cart.repository.CartRepository;
import com.smartvibe.modules.product.dto.ProductDTO;
import com.smartvibe.modules.product.entity.Product;

import java.util.List;
import java.util.Collections;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public Cart createCart(Long customerId) {
        Optional<Cart> cart = cartRepository.findByCustomerId(customerId);
        if (cart.isPresent()) {
            throw new AppException(ErrorCode.CART_ALREADY_EXISTS);
        }
        return cartRepository.save(Cart.builder().customerId(customerId).build());
    }

    public List<CartItemDTO> getCart(Long customerId) {
        Optional<Cart> cart = cartRepository.findByCustomerId(customerId);
        if (cart.isEmpty()) {
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }
        List<Object[]> cartItems = cartItemRepository.findAllByCartIdWithProduct(cart.get().getId());

        if (cartItems.isEmpty()) {
            return Collections.emptyList();
        }
        return cartItems.stream().map((Object[] row) -> {
            CartItem cartItem = (CartItem) row[0];
            Product product = (Product) row[1];

            // Tạo ProductDTO
            ProductDTO productDTO = ProductDTO.builder().id(product.getId()).sku(product.getSku())
                    .name(product.getName()).categoryId(product.getCategoryId()).brandId(product.getBrandId())
                    .isSerialized(product.isSerialized()).description(product.getDescription())
                    .warrantyMonths(product.getWarrantyMonths()).specifications(product.getSpecifications())
                    .thumbnail(product.getThumbnail()).status(product.getStatus()).basePrice(product.getBasePrice())
                    .build();

            // Tạo CartItemDTO
            return CartItemDTO.builder().id(cartItem.getId()).cartId(cartItem.getCartId()).productDTO(productDTO)
                    .quantity(cartItem.getQuantity()).createdAt(cartItem.getCreatedAt())
                    .updatedAt(cartItem.getUpdatedAt()).build();
        }).toList();
    }

    public void updateCartItem(CartItemDTO cartItem) {
        Optional<CartItem> cartOpt = cartItemRepository.findById(cartItem.getId());
        if (cartOpt.isEmpty()) {
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }
        cartItemRepository.save(CartItem.builder().id(cartItem.getId()).cartId(cartItem.getCartId())
                .productId(cartItem.getProductDTO().getId()).quantity(cartItem.getQuantity()).build());
    }

    public void deleteCartItem(CartItemDTO cartItem) {
        Optional<CartItem> cartOpt = cartItemRepository.findById(cartItem.getId());
        if (cartOpt.isEmpty()) {
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }
        cartItemRepository.deleteById(cartItem.getId());
    }

    public CartItemDTO addCartItem(CartItemDTO cartItemDTO) {
        Optional<Cart> cartOpt = cartRepository.findByCustomerId(cartItemDTO.getCartId());
        if (cartOpt.isEmpty()) {
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }
        Cart cart = cartOpt.get();
        CartItem newCartItem = CartItem.builder().cartId(cart.getId()).productId(cartItemDTO.getProductDTO().getId())
                .quantity(cartItemDTO.getQuantity()).build();
        cartItemRepository.save(newCartItem);
        return cartItemDTO;
    }
}
