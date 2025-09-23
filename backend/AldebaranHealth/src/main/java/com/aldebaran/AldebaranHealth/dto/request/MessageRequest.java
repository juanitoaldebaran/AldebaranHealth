package com.aldebaran.AldebaranHealth.dto.request;

import java.util.Date;

public class MessageRequest {
    private String content;
    private Date createdAt;

    public MessageRequest(String content, Date createdAt) {
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
