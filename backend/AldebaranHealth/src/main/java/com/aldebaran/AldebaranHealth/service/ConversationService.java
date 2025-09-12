package com.aldebaran.AldebaranHealth.service;

import com.aldebaran.AldebaranHealth.dto.request.ConversationRequest;
import com.aldebaran.AldebaranHealth.enums.SessionType;
import com.aldebaran.AldebaranHealth.model.Conversation;
import com.aldebaran.AldebaranHealth.model.User;
import com.aldebaran.AldebaranHealth.repository.ConversationRepo;
import com.aldebaran.AldebaranHealth.repository.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationService {
    private final Logger logger = LoggerFactory.getLogger(ConversationService.class);
    private final ConversationRepo conversationRepo;

    private final UserRepo userRepo;
    @Autowired
    public ConversationService(ConversationRepo conversationRepo, UserRepo userRepo) {
        this.conversationRepo = conversationRepo;
        this.userRepo = userRepo;
    }

    public Conversation createConversation(String email, ConversationRequest conversationRequest) {
        try {
            User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Failed to get a conversation by email" + email));

            Conversation newConversation = new Conversation();

            newConversation.setName(conversationRequest.getTitle());
            newConversation.setUser(user);
            newConversation.setSessionType(SessionType.DOCTOR);

            logger.info("Conversation created successfully for user" + email);
            return conversationRepo.save(newConversation);

        } catch (RuntimeException e) {
            logger.error("Failed to create a conversation");
            throw new RuntimeException("Failed to create conversation", e);
        }
    }

    public List<Conversation> getConversationsByUser(String email) {
        try {
            User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Failed to get a conversation by email" + email));

            List<Conversation> conversationList = conversationRepo.findByUser(user);

            return conversationList;
        } catch (RuntimeException e) {
            logger.error("Failed to get a conversation by user");
            throw new RuntimeException("Failed to get conversation by user", e);
        }
    }

    public List<Conversation> getAllConversations() {
        try {
            List<Conversation> conversationList = conversationRepo.findAll();

            logger.info("Successfully find all conversations");
            return conversationList;
        } catch (RuntimeException e) {
            logger.error("Failed to get a all conversations");
            throw new RuntimeException("Failed to get all conversations", e);
        }
    }

    public void deleteConversation(Long conversationId) {
        try {
            conversationRepo.deleteById(conversationId);
            logger.info("Successfully delete conversation by id");
        } catch (RuntimeException e) {
            logger.error("Failed to delete conversation by id");
            throw new RuntimeException("Failed to delete conversation by id", e);
        }

    }

    public List<Conversation> searchConversationByName(String name) {
        try {
            List<Conversation> conversationByName = conversationRepo.findByNameContainingIgnoreCase(name);

            logger.info("Successfully search conversations by name");
            return conversationByName;
        } catch (RuntimeException e) {
            logger.error("Failed to get a search conversations");
            throw new RuntimeException("Failed to get all conversations", e);
        }
    }

}
