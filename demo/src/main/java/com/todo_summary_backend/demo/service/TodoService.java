package com.todo_summary_backend.demo.service;

import com.todo_summary_backend.demo.model.Todo;
import com.todo_summary_backend.demo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository repository;

    public List<Todo> getAllTodos() {
        return repository.findAll();
    }

    public Todo addTodo(Todo todo) {
        return repository.save(todo);
    }

    public void deleteTodo(Long id) {
        repository.deleteById(id);
    }

    public List<Todo> getPendingTodos() {
        return repository.findByCompletedFalse();
    }
    public Todo updateTodo(Long id, Todo todo) {
        Todo existingTodo = repository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
        existingTodo.setTitle(todo.getTitle());
        existingTodo.setCompleted(todo.isCompleted());
        return repository.save(existingTodo);
    }
}
