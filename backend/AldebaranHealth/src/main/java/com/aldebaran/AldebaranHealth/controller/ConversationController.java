package com.aldebaran.AldebaranHealth.controller;

import com.aldebaran.AldebaranHealth.dto.request.ConversationRequest;
import com.aldebaran.AldebaranHealth.dto.response.ConversationResponse;
import com.aldebaran.AldebaranHealth.model.Conversation;
import com.aldebaran.AldebaranHealth.service.ConversationService;
import com.aldebaran.AldebaranHealth.util.AuthenticationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/conversation")
public class ConversationController {

    private static final Logger logger = LoggerFactory.getLogger(ConversationController.class);

    private final ConversationService conversationService;
    private final AuthenticationUtil authenticationUtil;

    @Autowired
    public ConversationController(ConversationService conversationService, AuthenticationUtil authenticationUtil) {
        this.conversationService = conversationService;
        this.authenticationUtil = authenticationUtil;
    }

    @PostMapping
    public ResponseEntity<?> createConversation(@RequestBody ConversationRequest conversationRequest) {
        try {
            String userEmail = authenticationUtil.getCurrentEmail();
            Conversation newConversation = conversationService.createConversation(userEmail, conversationRequest);
            ConversationResponse conversationResponse = new ConversationResponse(newConversation);

            return ResponseEntity.status(HttpStatus.CREATED).body(conversationResponse);
        } catch (Exception e) {
            logger.error("Unexpected error creating conversation: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserConversations() {
        try {
            String userEmail = authenticationUtil.getCurrentEmail();
            List<Conversation> conversations = conversationService.getConversationsByUser(userEmail);

            List<ConversationResponse> responses = conversations.stream()
                    .map(ConversationResponse::new)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responses, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Failed to fetch user conversations: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUserConversations(@RequestParam String term) {
        try {
            String userEmail = authenticationUtil.getCurrentEmail();
            List<Conversation> conversations = conversationService.searchUserConversationsByName(userEmail, term);

            List<ConversationResponse> responses = conversations.stream()
                    .map(ConversationResponse::new)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responses, HttpStatus.OK);
        }  catch (Exception e) {
            logger.error("Unexpected error searching conversations: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllConversations() {
        try {
            List<Conversation> allConversations = conversationService.getAllConversations();
            return new ResponseEntity<>(allConversations, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Failed to fetch all conversations: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}