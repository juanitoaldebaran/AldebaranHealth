package com.aldebaran.AldebaranHealth.config;

import com.google.genai.Client;
import com.google.genai.types.HttpOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GeminiAIConfig {

    private String geminiApiKey;

    public GeminiAIConfig(@Value("${spring.gemini.api-key}") String geminiApiKey) {
        this.geminiApiKey = geminiApiKey;
    }
     @Bean
    public Client GeminiAIClient() {
         Client client = Client.builder()
                 .apiKey(geminiApiKey)
                 .httpOptions(HttpOptions.builder()
                         .apiVersion("v1alpha")
                         .build())
                 .build();

        return client;
    }
}
