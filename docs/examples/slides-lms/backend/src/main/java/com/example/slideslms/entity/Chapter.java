package com.example.slideslms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chapters")
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnore
    private Course course;

    @Column(nullable = false)
    private String title;

    @Column(name = "order_index", nullable = false)
    private int orderIndex;

    @OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<Slide> slides = new ArrayList<>();

    protected Chapter() {}

    public Chapter(String title, int orderIndex) {
        this.title = title;
        this.orderIndex = orderIndex;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public int getOrderIndex() { return orderIndex; }
    public List<Slide> getSlides() { return slides; }

    void setCourse(Course course) { this.course = course; }

    public void addSlide(Slide slide) {
        slide.setChapter(this);
        this.slides.add(slide);
    }
}
