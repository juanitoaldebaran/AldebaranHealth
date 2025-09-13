package com.aldebaran.AldebaranHealth.controller;

import com.aldebaran.AldebaranHealth.dto.request.MessageRequest;
import com.aldebaran.AldebaranHealth.dto.response.MessageResponse;
import com.aldebaran.AldebaranHealth.service.MessageService;
import com.aldebaran.AldebaranHealth.util.AuthenticationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conversation/{conversationId}/messages")
public class MessageController {

    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    private final MessageService messageService;
    private final AuthenticationUtil authenticationUtil;

    public MessageController(MessageService messageService, AuthenticationUtil authenticationUtil) {
        this.messageService = messageService;
        this.authenticationUtil = authenticationUtil;
    }

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody MessageRequest messageRequest, @PathVariable Long conversationId) {
        try {
            String userEmail = authenticationUtil.getCurrentEmail();

            List<MessageResponse> messages = messageService.createMessage(conversationId, messageRequest);
            logger.info("Messages created successfully for conversation: {} by user: {}", conversationId, userEmail);
            return new ResponseEntity<>(messages, HttpStatus.CREATED);

        } catch (Exception e) {
            logger.error("Unexpected error creating messages: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> getConversationMessages(@PathVariable Long conversationId) {
        try {
            List<MessageResponse> messages = messageService.getMessageById(conversationId);
            return new ResponseEntity<>(messages, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Unexpected error getting messages: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllMessages() {
        try {
            List<MessageResponse> allMessages = messageService.getAllMessages();
            return new ResponseEntity(allMessages, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}