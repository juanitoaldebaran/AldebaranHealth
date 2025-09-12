package com.aldebaran.AldebaranHealth.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Value("${spring.security.jwt.secret-key}")
    private String jwtSecretKey;

    @Value("${spring.security.jwt.expiration}")
    private Long expirationTime;

    public Claims extractAllClaims(String jwtToken) {
        try {
            return Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(jwtToken)
                    .getPayload();
        } catch (Exception e) {
            logger.error("Failed to extract all claims", e.getMessage());
            throw new RuntimeException("Failed to extract all claims", e);
        }
    }

    public <T> T extractClaims(String jwtToken, Function<Claims, T> claimsResolver) {
        try {
            final Claims claims = extractAllClaims(jwtToken);
            return claimsResolver.apply(claims);
        } catch (Exception e) {
            logger.error("Failed to extract claims", e.getMessage());
            throw new RuntimeException("Failed to extract claims", e);
        }
    }

    public String extractUserName(String jwtToken) {
        try {
            return extractClaims(jwtToken, Claims::getSubject);
        } catch (Exception e) {
            logger.error("Failed to extract username", e.getMessage());
            throw new RuntimeException("Failed to extract username", e);
        }
    }

    public Date extractExpiration(String jwtToken) {
        try {
            return extractClaims(jwtToken, Claims::getExpiration);
        } catch (Exception e) {
            logger.error("Failed to extract expiration time", e.getMessage());
            throw new RuntimeException("Failed to extract expiration time", e);
        }
    }

    public boolean isTokenExpired(String jwtToken) {
        try {
            return extractExpiration(jwtToken).before(new Date());
        } catch (Exception e) {
            logger.error("Failed to check if token is expired", e.getMessage());
            throw new RuntimeException("Failed to check if token is expired", e);
        }
    }

    public String generateJwtToken(UserDetails userDetails) {
        return generateJwtToken(userDetails, new HashMap<>());
    }

    public String generateJwtToken(UserDetails userDetails, Map<String, Object> claims) {
        return buildJwtToken(userDetails, claims);
    }

    public String buildJwtToken(UserDetails userDetails, Map<String , Object> claims) {
        try {
            String token =  Jwts.builder()
                    .subject(userDetails.getUsername())
                    .claims(claims)
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis() + expirationTime))
                    .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                    .compact();

            logger.info("Successfully build jwt token");
            return token;
        } catch (Exception e) {
            logger.error("Failed to build jwt token", e.getMessage());
            throw new RuntimeException("Failed to build jwt token", e);
        }
    }

    public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
        try {
            String userName = userDetails.getUsername();

            return userName.equals(extractUserName(jwtToken)) && !isTokenExpired(jwtToken);
        } catch (Exception e) {
            logger.error("Failed to check if token is valid", e.getMessage());
            throw new RuntimeException("Failed to check if token is valid", e);
        }
    }

    public Long getExpirationTime() {
        return expirationTime;
    }

    public SecretKey getSigningKey() {
        try {
            byte[] secretKeyBytes = Decoders.BASE64.decode(jwtSecretKey);
            return Keys.hmacShaKeyFor(secretKeyBytes);
        } catch (Exception e) {
            logger.error("Failed to generate secret key: " + e.getMessage());
            throw new RuntimeException("Failed to generate secret key", e);
        }
    }
}
