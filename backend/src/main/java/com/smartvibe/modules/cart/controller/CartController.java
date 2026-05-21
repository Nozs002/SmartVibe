package com.smartvibe.modules.cart.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.cart.dto.CartItemDTO;
import com.smartvibe.modules.cart.entity.Cart;
import com.smartvibe.modules.cart.service.CartService;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping("/getCartItem")
    public ApiResponse<List<CartItemDTO>> getCartItem(@RequestParam Long customerId) {
        ApiResponse<List<CartItemDTO>> response = new ApiResponse<>();
        response.setResult(cartService.getCart(customerId));
        return response;
    }

    @PutMapping("/updateQuantity")
    public ApiResponse<String> updateQuantity(@RequestBody CartItemDTO cartItem) {
        ApiResponse<String> response = new ApiResponse<>();
        cartService.updateCartItem(cartItem);
        response.setResult("Update success");
        return response;
    }

    @DeleteMapping("/deleteCartItem")
    public ApiResponse<String> deleteCartItem(@RequestBody CartItemDTO cartItem) {
        ApiResponse<String> response = new ApiResponse<>();
        cartService.deleteCartItem(cartItem);
        response.setResult("Delete success");
        return response;
    }

    @PostMapping("/addCartItem")
    public ApiResponse<CartItemDTO> addCartItem(@RequestBody CartItemDTO cartItem) {
        ApiResponse<CartItemDTO> response = new ApiResponse<>();
        response.setResult(cartService.addCartItem(cartItem));
        return response;
    }
}
