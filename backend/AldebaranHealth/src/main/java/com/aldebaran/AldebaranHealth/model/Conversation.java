package com.aldebaran.AldebaranHealth.model;

import com.aldebaran.AldebaranHealth.enums.SessionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table (name = "conversation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "conversation_id")
    private Long conversationId;

    @ManyToOne
    @JoinColumn (name = "user_id", nullable = false)
    private User user;

    @Column (name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column (name = "session_type")
    private SessionType sessionType;

    @CreationTimestamp
    @Column (name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany (mappedBy = "conversation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Message> messageList;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}
