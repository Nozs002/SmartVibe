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

        // 1. Lấy thẻ từ trong Header có tên là "Authorization"
        String authHeader = request.getHeader("Authorization");

        // 2. Kiểm tra xem thẻ có bắt đầu bằng chữ "Bearer " không (Chuẩn quốc tế)
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // Cắt bỏ 7 ký tự "Bearer " để lấy đúng cái lõi token

            // 3. Đưa vào máy quét
            var claims = jwtTokenProvider.verifyTokenAndGetClaims(token);

            if (claims != null) {
                try {
                    // 4. Nếu thẻ xịn -> Lấy thông tin Tên và Quyền ra
                    String username = claims.getSubject();
                    String role = claims.getStringClaim("scope");

                    // Spring Security yêu cầu chữ ROLE_ đứng trước quyền (Ví dụ: ROLE_CUSTOMER)
                    var authority = new SimpleGrantedAuthority("ROLE_" + role.toUpperCase());

                    // 5. Cấp giấy phép đi lại trong hệ thống (Authentication Token)
                    var authentication = new UsernamePasswordAuthenticationToken(username, null,
                            Collections.singletonList(authority));

                    // 6. Ghi danh vào Sổ Nam Tào (SecurityContextHolder)
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                } catch (Exception e) {
                    // Lỗi đọc thẻ thì bỏ qua, hệ thống sẽ tự chặn ở bước sau
                }
            }
        }

        // Mời đi tiếp đến Controller hoặc Filter tiếp theo
        filterChain.doFilter(request, response);
    }
}
