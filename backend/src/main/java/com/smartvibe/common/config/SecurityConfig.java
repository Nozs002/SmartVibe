package com.smartvibe.common.config;

import com.smartvibe.common.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Bật tính năng phân quyền bằng Annotation (@PreAuthorize)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Vẫn tắt CSRF để test Postman
                .authorizeHttpRequests(auth -> auth
                        // CHỈ MỞ CỬA 2 ĐƯỜNG NÀY (Đăng ký và Đăng nhập)
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                        //TẤT CẢ CÁC ĐƯỜNG KHÁC BẮT BUỘC PHẢI CÓ THẺ XỊN
                        .anyRequest().authenticated())
                // Nhét ông bảo vệ của chúng ta đứng TRƯỚC ông bảo vệ mặc định của Spring
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 5. Cấu hình mã hóa mật khẩu (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10); // Số 10 là độ khó (strength) của thuật toán
    }
}