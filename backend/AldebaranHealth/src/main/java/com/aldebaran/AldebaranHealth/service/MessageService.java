package com.aldebaran.AldebaranHealth.service;

import com.aldebaran.AldebaranHealth.dto.request.MessageRequest;
import com.aldebaran.AldebaranHealth.dto.response.MessageResponse;
import com.aldebaran.AldebaranHealth.enums.SenderType;
import com.aldebaran.AldebaranHealth.model.Conversation;
import com.aldebaran.AldebaranHealth.model.Message;
import com.aldebaran.AldebaranHealth.repository.ConversationRepo;
import com.aldebaran.AldebaranHealth.repository.MessageRepo;
import com.google.genai.types.GenerateContentResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    private final Logger logger = LoggerFactory.getLogger(MessageService.class);
    private final MessageRepo messageRepo;
    private final ConversationRepo conversationRepo;
    private final GeminiAIService geminiAIService;

    @Autowired
    public MessageService(MessageRepo messageRepo, ConversationRepo conversationRepo, GeminiAIService geminiAIService) {
        this.messageRepo = messageRepo;
        this.conversationRepo = conversationRepo;
        this.geminiAIService = geminiAIService;
    }

    public List<MessageResponse> createMessage(Long conversationId, MessageRequest messageRequest) {
        try {

            if (messageRequest.getContent() == null || messageRequest.getContent().trim().isEmpty()) {
                throw new IllegalArgumentException("Message cannot be empty");
            }

            Conversation conversationById = conversationRepo.findById(conversationId)
                    .orElseThrow(() -> new RuntimeException("No conversation found with ID: " + conversationId));

            // Create User Message
            Message userMessage = new Message();
            userMessage.setContent(messageRequest.getContent().trim()); // Trim the message
            userMessage.setConversation(conversationById);
            userMessage.setSenderType(SenderType.USER);
            userMessage.setCreatedAt(LocalDateTime.now());

            messageRepo.save(userMessage);
            logger.info("User message saved for conversation: {}", conversationId);

            // Generate AI Response
            try {
                GenerateContentResponse aiResponse = geminiAIService.generateAIResponse(messageRequest.getContent());

                if (aiResponse != null && aiResponse.text() != null && !aiResponse.text().trim().isEmpty()) {
                    Message aiMessage = new Message();
                    aiMessage.setContent(aiResponse.text().trim());
                    aiMessage.setConversation(conversationById);
                    aiMessage.setSenderType(SenderType.AI);
                    aiMessage.setCreatedAt(LocalDateTime.now());

                    messageRepo.save(aiMessage);
                    logger.info("AI Message saved for conversation: {}", conversationId);
                } else {
                    logger.warn("AI Response is empty or null: {}", conversationId);
                }
            } catch (Exception e) {

                Message aiErrorMessage = new Message();
                aiErrorMessage.setConversation(conversationById);
                aiErrorMessage.setContent("AI Failed to generate response, Please try again");
                aiErrorMessage.setSenderType(SenderType.AI);
                aiErrorMessage.setCreatedAt(LocalDateTime.now());

                messageRepo.save(aiErrorMessage);
                logger.info("AI Failed messages saved for conversation: {}", conversationId);
            }

            List<Message> allMessages = messageRepo.findByConversation_ConversationIdOrderByCreatedAtAsc(conversationId);
            return allMessages.stream()
                    .map(m -> new MessageResponse(m.getContent(), m.getSenderType(), m.getCreatedAt()))
                    .collect(Collectors.toList());

        } catch (IllegalArgumentException e) {
            logger.error("Invalid input for conversation {}: {}", conversationId, e.getMessage());
            throw e;
        } catch (RuntimeException e) {
            logger.error("Failed to create messages for conversation {}: {}", conversationId, e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected error creating messages: {}", e.getMessage());
            throw new RuntimeException("Failed to process message request", e);
        }
    }

    public List<MessageResponse> getAllMessages() {
        try {
            List<Message> allMessages = messageRepo.findAll();
            return allMessages.stream()
                    .map(m -> new MessageResponse(m.getContent(), m.getSenderType(), m.getCreatedAt()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Failed to get all messages: {}", e.getMessage());
            throw new RuntimeException("Failed to retrieve messages", e);
        }
    }

    public List<MessageResponse> getMessageById(Long conversationId) {
        try {
            conversationRepo.findById(conversationId)
                    .orElseThrow(() -> new RuntimeException("No conversation found with ID: " + conversationId));

            List<Message> messagesListById = messageRepo.findByConversation_ConversationIdOrderByCreatedAtAsc(conversationId);
            return messagesListById.stream()
                    .map(m -> new MessageResponse(m.getContent(), m.getSenderType(), m.getCreatedAt()))
                    .collect(Collectors.toList());
        } catch (RuntimeException e) {
            logger.error("Failed to get messages for conversation {}: {}", conversationId, e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected error getting messages: {}", e.getMessage());
            throw new RuntimeException("Failed to retrieve conversation messages", e);
        }
    }
}