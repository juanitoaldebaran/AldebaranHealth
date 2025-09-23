package com.aldebaran.AldebaranHealth.dto.response;

import com.aldebaran.AldebaranHealth.enums.SessionType;
import com.aldebaran.AldebaranHealth.model.Conversation;

import java.util.Date;

public class ConversationResponse {
    private Long conversationId;
    private String name;
    private SessionType sessionType;
    private Date createdAt;

    public ConversationResponse(Conversation conversation) {
        this.conversationId = conversation.getConversationId();
        this.name = conversation.getName();
        this.sessionType = conversation.getSessionType();
        this.createdAt = conversation.getCreatedAt();
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
