package com.aldebaran.AldebaranHealth.dto.request;

public class ConversationRequest {
    private String title;

    public ConversationRequest(String title) {
        this.title = title;
    }

    public ConversationRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
