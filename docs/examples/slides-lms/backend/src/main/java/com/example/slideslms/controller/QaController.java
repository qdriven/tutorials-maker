package com.example.slideslms.controller;

import com.example.slideslms.entity.QaEntry;
import com.example.slideslms.service.QaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses/{courseId}/qa")
public class QaController {

    private final QaService qaService;

    public QaController(QaService qaService) {
        this.qaService = qaService;
    }

    /** EARS-5：历史问答 */
    @GetMapping
    public List<QaEntry> history(@PathVariable Long courseId) {
        return qaService.history(courseId);
    }

    /** EARS-4：提问 → 解答并持久化 */
    @PostMapping
    public QaEntry ask(@PathVariable Long courseId, @RequestBody Map<String, String> body) {
        String question = body.getOrDefault("question", "").trim();
        if (question.isEmpty()) {
            throw new IllegalArgumentException("question 不能为空");
        }
        return qaService.ask(courseId, question);
    }
}
