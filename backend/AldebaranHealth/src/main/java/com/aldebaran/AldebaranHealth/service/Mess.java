package com.aldebaran.AldebaranHealth.service;

import com.aldebaran.AldebaranHealth.dto.request.MessageRequest;
import com.aldebaran.AldebaranHealth.dto.response.MessageResponse;
import com.aldebaran.AldebaranHealth.enums.SenderType;
import com.aldebaran.AldebaranHealth.model.Conversation;
import com.aldebaran.AldebaranHealth.model.Message;
import com.aldebaran.AldebaranHealth.repository.ConversationRepo;
import com.aldebaran.AldebaranHealth.repository.MessageRepo;
import com.google.genai.Client;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    private final Logger logger = LoggerFactory.getLogger(MessageService.class);
    private final String geminiAIModel = "gemini-2.5-flash";
    private final MessageRepo messageRepo;
    private final ConversationRepo conversationRepo;
    private final Client aiClient;

    public MessageService(MessageRepo messageRepo, ConversationRepo conversationRepo, Client aiClient) {
        this.messageRepo = messageRepo;
        this.conversationRepo = conversationRepo;
        this.aiClient = aiClient;
    }

    public List<MessageResponse> createMessage(Long conversationId, MessageRequest messageRequest) {
        try {
            ///Create User Message
            Conversation conversationById = conversationRepo.findById(conversationId).orElseThrow(() -> new RuntimeException("Failed to find conversation by id"));

            Message userMessage = new Message();
            userMessage.setContent(messageRequest.getContent());
            userMessage.setConversation(conversationById);
            userMessage.setSenderType(SenderType.USER);
            userMessage.setCreatedAt(messageRequest.getCreatedAt());
            logger.info("Successfully create a user message");

            ///Create AI Message
            try {
                if (aiResponse.text() != null && !aiResponse.text().trim().isEmpty()) {
                    Message aiMessage = new Message();
                    aiMessage.setContent(aiResponse.text().trim());
                    aiMessage.setConversation(conversationById);
                    aiMessage.setSenderType(SenderType.AI);
                    aiMessage.setCreatedAt(messageRequest.getCreatedAt());

                    messageRepo.save(aiMessage);
                    logger.info("Successfully create a user message");
                }
            } catch (Exception e) {
                Message aiErrorMessage = new Message();
                aiErrorMessage.setConversation(conversationById);
                aiErrorMessage.setContent("AI Failed to generate response, Please try again");
                aiErrorMessage.setSenderType(SenderType.AI);
                aiErrorMessage.setCreatedAt(messageRequest.getCreatedAt());

                messageRepo.save(aiErrorMessage);
                logger.info("Error message has been successfully saved");
            }

            List<Message> allMessages = messageRepo.findByConversationIdOrderByCreatedAtAsc(conversationId);
            return allMessages.stream()
                    .map(message -> new MessageResponse(message.getContent(), message.getSenderType(), message.getCreatedAt()))
                    .collect(Collectors.toList());

        } catch (Exception e) {
            logger.error("Failed to create messages for conversation" + conversationId);
            throw new RuntimeException("Failed to create message", e);
        }
    }
}
