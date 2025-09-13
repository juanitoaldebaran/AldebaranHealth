package com.aldebaran.AldebaranHealth.repository;

import com.aldebaran.AldebaranHealth.enums.SenderType;
import com.aldebaran.AldebaranHealth.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {
    Message findByContent(String content);
    List<Message> findByConversation_ConversationIdOrderByCreatedAtAsc(Long conversationId);

    List<Message> findByConversation_ConversationIdOrderByCreatedAtDesc(Long conversationId);

    List<Message> findByConversation_ConversationIdAndSenderType(Long conversationId, SenderType senderType);

}
