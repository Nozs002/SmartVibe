package com.smartvibe.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Kích hoạt CORS và sử dụng cấu hình từ bean corsConfigurationSource() bên dưới
            .cors(Customizer.withDefaults())
            
            // 2. Tắt CSRF (Bắt buộc để gọi API từ bên ngoài như React/Postman)
            .csrf(AbstractHttpConfigurer::disable)

            // 3. Cho phép tất cả các request để test nhanh
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            );

        return http.build();
    }

    // 4. Cấu hình chi tiết các quyền truy cập CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Cho phép origin của React
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); 
        // Cho phép các phương thức phổ biến
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Cho phép các headers cần thiết
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
        // Cho phép gửi kèm Cookie hoặc thông tin xác thực
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Áp dụng cho tất cả các đường dẫn API
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}