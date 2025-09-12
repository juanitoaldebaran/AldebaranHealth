package com.aldebaran.AldebaranHealth.dto.response;

import org.springframework.cglib.core.Local;

import java.text.DateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class LoginUserResponse {
    private String jwtToken;
    private String expiresAt;
    private UserResponse userResponse;

    public LoginUserResponse(String jwtToken, String expiresAt) {
        this.jwtToken = jwtToken;
        this.expiresAt = expiresAt;
    }

    public LoginUserResponse() {

    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(long expiresInMs) {
        Instant instant = Instant.ofEpochMilli(expiresInMs);
        DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME.withZone(ZoneId.systemDefault());
        this.expiresAt = formatter.format(instant);
    }

    public UserResponse getUserResponse() {
        return userResponse;
    }

    public void setUserResponse(UserResponse userResponse) {
        this.userResponse = userResponse;
    }
}
