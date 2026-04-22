package com.smartvibe.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Tắt tính năng bảo vệ CSRF (Bắt buộc phải tắt thì Postman mới gửi được lệnh
                // POST/PUT/DELETE)
                .csrf(AbstractHttpConfigurer::disable)

                // Cấu hình phân quyền đường dẫn
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll() // Tạm thời cho phép TẤT CẢ các request đi
                                                                             // qua mà không cần đăng nhập
                );

        return http.build();
    }
}