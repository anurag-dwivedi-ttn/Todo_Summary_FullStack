package com.todo_summary_backend.demo.controller;

import com.todo_summary_backend.demo.model.Todo;
import com.todo_summary_backend.demo.service.LLMService;
import com.todo_summary_backend.demo.service.SlackService;
import com.todo_summary_backend.demo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SummaryController {
    private final TodoService todoService;
    private final LLMService llmService;
    private final SlackService slackService;

    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeAndSend() {
        List<Todo> todos = todoService.getPendingTodos();
        if (todos.isEmpty()) return ResponseEntity.ok("No pending todos.");

        String summary = llmService.summarizeTodos(todos);
        boolean sent = slackService.sendToSlack(summary);
        return ResponseEntity.ok(sent ? "Summary sent to Slack!" : "Slack send failed.");
    }
}

