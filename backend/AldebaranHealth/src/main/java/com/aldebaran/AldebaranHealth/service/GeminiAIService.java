package com.aldebaran.AldebaranHealth.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeminiAIService {
    private final Logger logger = LoggerFactory.getLogger(GeminiAIService.class);
    private final Client aiClient;

    private static final String AI_GEMINI_MODEL = "gemini-2.5-flash";

    @Autowired
    public GeminiAIService(Client aiClient) {
        this.aiClient = aiClient;
    }

    public GenerateContentResponse generateAIResponse(String message) {
        int maxRetries = 3;
        int retryDelay = 1000;

        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("Message cannot be empty");
        }

        logger.info("Generating AI response for message: '{}'", message);

        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                long startTime = System.currentTimeMillis();

                GenerateContentResponse response = aiClient.models.generateContent(AI_GEMINI_MODEL, message.trim(), null);

                long processingTime = System.currentTimeMillis() - startTime;

                if (response != null && response.text() != null && !response.text().trim().isEmpty()) {
                    logger.info("AI response generated successfully (attempt {}, processing time: {}ms)", attempt, processingTime);
                    return response;
                } else {
                    logger.warn("AI Response is empty or null on attempt {}", attempt);
                    if (attempt == maxRetries) {
                        throw new RuntimeException("AI response is empty after all attempts");
                    }
                }

            } catch (IllegalArgumentException e) {
                logger.error("Invalid input: {}", e.getMessage());
                throw e;
            } catch (Exception e) {
                logger.warn("AI response generation failed on attempt {} of {}: {}", attempt, maxRetries, e.getMessage());

                if (attempt == maxRetries) {
                    logger.error("Failed to generate AI response after {} attempts", maxRetries);
                    throw new RuntimeException("AI service unavailable after " + maxRetries + " attempts: " + e.getMessage());
                }

                try {
                    Thread.sleep(retryDelay * attempt);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Request interrupted", ie);
                }
            }
        }

        throw new RuntimeException("Failed to generate AI response");
    }
}