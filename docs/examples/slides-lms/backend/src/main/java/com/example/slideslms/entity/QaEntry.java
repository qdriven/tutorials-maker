package com.example.slideslms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "qa_entries")
public class QaEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnore
    private Course course;

    @Column(nullable = false, length = 2000)
    private String question;

    @Column(nullable = false, length = 8000)
    private String answer;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    protected QaEntry() {}

    public QaEntry(Course course, String question, String answer) {
        this.course = course;
        this.question = question;
        this.answer = answer;
    }

    public Long getId() { return id; }
    public String getQuestion() { return question; }
    public String getAnswer() { return answer; }
    public Instant getCreatedAt() { return createdAt; }
}
