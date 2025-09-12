package com.aldebaran.AldebaranHealth.config;

import com.google.genai.Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GeminiAIConfig {

    @Value("${spring.gemini.api-key}")
    private String geminiApiKey;
    @Bean
    public Client GeminiAIClient() {
        Client client = Client.builder()
                .apiKey(geminiApiKey)
                .vertexAI(true)
                .build();

        return client;
    }
}
