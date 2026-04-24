package com.smartvibe.common.security;

import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {

    // Copy key từ AuthService qua đây
    private static final String SIGNER_KEY = "Daylakhoabimatcododaitoithiru64bitdekyTokenJWTchohethongSMARTVIBE";

    // Hàm này làm nhiệm vụ: Giải mã -> Kiểm tra chữ ký -> Kiểm tra hạn sử dụng
    public JWTClaimsSet verifyTokenAndGetClaims(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

            // Nếu chữ ký đúng VÀ thời gian hết hạn (exp) vẫn lớn hơn thời gian hiện tại
            if (signedJWT.verify(verifier) && signedJWT.getJWTClaimsSet().getExpirationTime().after(new Date())) {
                return signedJWT.getJWTClaimsSet(); // Trả về nội dung (Payload) của thẻ
            }
        } catch (Exception e) {
            log.error("Token không hợp lệ hoặc đã hết hạn", e);
        }
        return null; // Nếu thẻ giả hoặc hết hạn thì trả về null
    }
}