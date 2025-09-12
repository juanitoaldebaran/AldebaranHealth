package com.aldebaran.AldebaranHealth.dto.response;

import com.aldebaran.AldebaranHealth.model.User;

import java.time.LocalDateTime;

public class UserResponse {
    private String userName;
    private String email;
    private LocalDateTime createdAt;

    public UserResponse(User user) {
        this.userName = user.getUsername();
        this.email = user.getEmail();
        this.createdAt = user.getCreatedAt();
    }

    public UserResponse() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
