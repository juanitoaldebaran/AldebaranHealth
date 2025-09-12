package com.aldebaran.AldebaranHealth.dto.response;

import com.aldebaran.AldebaranHealth.enums.SenderType;

import java.time.LocalDateTime;

public class MessageResponse {
    private String content;
    private SenderType senderType;
    private LocalDateTime createdAt;

    public MessageResponse(String content, SenderType senderType, LocalDateTime createdAt) {
        this.content = content;
        this.senderType = senderType;
        this.createdAt = createdAt;
    }

    public MessageResponse() {
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public SenderType getSenderType() {
        return senderType;
    }

    public void setSenderType(SenderType senderType) {
        this.senderType = senderType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
