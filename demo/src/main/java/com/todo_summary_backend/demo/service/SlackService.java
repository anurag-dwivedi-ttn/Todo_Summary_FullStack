package com.todo_summary_backend.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class SlackService {
    @Value("${slack.webhook.url}")
    private String webhookUrl;

    public boolean sendToSlack(String message) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> payload = Map.of("text", message);
        try {
            restTemplate.postForEntity(webhookUrl, payload, String.class);
            return true;
        } catch (Exception e) {
            System.out.println("Slack error: " + e.getMessage());
            return false;
        }
    }
}