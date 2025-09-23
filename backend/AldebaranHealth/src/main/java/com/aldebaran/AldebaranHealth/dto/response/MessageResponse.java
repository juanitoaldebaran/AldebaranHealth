package com.aldebaran.AldebaranHealth.dto.response;

import com.aldebaran.AldebaranHealth.enums.SenderType;

import java.util.Date;

public class MessageResponse {
    private String content;
    private SenderType senderType;
    private Date createdAt;

    public MessageResponse(String content, SenderType senderType, Date createdAt) {
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
