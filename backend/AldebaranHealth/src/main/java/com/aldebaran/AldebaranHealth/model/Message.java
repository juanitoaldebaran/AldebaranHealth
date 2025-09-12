package com.aldebaran.AldebaranHealth.model;

import com.aldebaran.AldebaranHealth.enums.SenderType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table (name = "message")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "message_id")
    private Long messageId;

    @Column (name = "content")
    private String content;

    @Column (name = "sender_type")
    @Enumerated(EnumType.STRING)
    private SenderType senderType;

    @CreationTimestamp
    @Column (name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn (name = "conversation_id", nullable = false)
    private Conversation conversation;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}
