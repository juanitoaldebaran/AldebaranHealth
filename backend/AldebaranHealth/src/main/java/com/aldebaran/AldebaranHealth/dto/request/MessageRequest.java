package com.aldebaran.AldebaranHealth.dto.request;

import java.time.LocalDateTime;

public class MessageRequest {
    private String content;
    private LocalDateTime createdAt;

    public MessageRequest(String content, LocalDateTime createdAt) {
        this.content = content;
        this.createdAt = createdAt;
    }

    public MessageRequest() {
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
