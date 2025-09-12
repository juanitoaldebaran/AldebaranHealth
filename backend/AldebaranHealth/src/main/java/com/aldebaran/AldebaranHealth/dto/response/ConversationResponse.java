package com.aldebaran.AldebaranHealth.dto.response;

import com.aldebaran.AldebaranHealth.enums.SessionType;

import java.time.LocalDateTime;

public class ConversationResponse {
    private Long conversationId;
    private String name;
    private SessionType sessionType;
    private LocalDateTime createdAt;

    public ConversationResponse(Long conversationId, String name, SessionType sessionType, LocalDateTime createdAt) {
        this.conversationId = conversationId;
        this.name = name;
        this.sessionType = sessionType;
        this.createdAt = createdAt;
    }

    public ConversationResponse() {
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SessionType getSessionType() {
        return sessionType;
    }

    public void setSessionType(SessionType sessionType) {
        this.sessionType = sessionType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
