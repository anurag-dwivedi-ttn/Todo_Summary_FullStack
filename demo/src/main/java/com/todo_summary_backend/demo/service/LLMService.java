package com.todo_summary_backend.demo.service;

import com.todo_summary_backend.demo.model.Todo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class LLMService {
    @Value("${cohere.api.key}")
    private String apiKey;

    public String summarizeTodos(List<Todo> todos) {
        String prompt = "Summarize the following tasks:\n";
        for (Todo t : todos) {
            prompt += "- " + t.getTitle() + " (" + (t.isCompleted() ? "completed" : "pending") + ")\n";
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "model", "command-light",
                "prompt", prompt,
                "max_tokens", 100
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            String url = "https://api.cohere.ai/v1/generate";
            Map response = restTemplate.postForObject(url, request, Map.class);

            List<Map> generations = (List<Map>) response.get("generations");
            return generations.get(0).get("text").toString().trim();
        } catch (Exception e) {
            return "Error generating summary: " + e.getMessage();
        }
    }
}