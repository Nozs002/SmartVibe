package com.smartvibe.common.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_OK);
            return; // Dừng tại đây, không đi vào check Token nữa
        }
        // 1. Lấy thẻ từ trong Header có tên là "Authorization"
        String authHeader = request.getHeader("Authorization");

        // 2. Kiểm tra xem thẻ có bắt đầu bằng chữ "Bearer " không (Chuẩn quốc tế)
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // Cắt bỏ 7 ký tự "Bearer " để lấy đúng cái lõi token

            // 3. Đưa vào máy quét
            var claims = jwtTokenProvider.verifyTokenAndGetClaims(token);

            if (claims != null) {
                try {
                    System.out.println("=== BẮT ĐẦU ĐỌC TOKEN ===");

                    String username = claims.getSubject();
                    String role = claims.getStringClaim("scope");

                    System.out.println("Username từ Token: " + username);
                    System.out.println("Role gốc từ Token: " + role);

                    String formattedRole = role.replace(" ", "_").toUpperCase();
                    var authority = new SimpleGrantedAuthority("ROLE_" + formattedRole);

                    System.out.println("Quyền cấp phát: " + authority.getAuthority());

                    var authentication = new UsernamePasswordAuthenticationToken(username, null,
                            Collections.singletonList(authority));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("=== ĐÃ GHI DANH THÀNH CÔNG VÀO SECURITY CONTEXT ===");

                } catch (Exception e) {
                    // ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT: Bắt hệ thống phải in ra lỗi
                    System.err.println("=== LỖI KHI XỬ LÝ TOKEN ===");
                    e.printStackTrace();
                }
            } else {
                System.err.println("=== LỖI: CLAIMS LÀ NULL ===");
            }
        }

        // Mời đi tiếp đến Controller hoặc Filter tiếp theo
        filterChain.doFilter(request, response);
    }
}
