package com.example.slideslms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "slides")
public class Slide {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chapter_id", nullable = false)
    @JsonIgnore
    private Chapter chapter;

    @Column(nullable = false)
    private String title;

    /** 教学内容（展示区上方） */
    @Column(nullable = false, length = 4000)
    private String content;

    /** 详细内容（展示区下方） */
    @Column(length = 8000)
    private String detail;

    @Column(name = "order_index", nullable = false)
    private int orderIndex;

    protected Slide() {}

    public Slide(String title, String content, String detail, int orderIndex) {
        this.title = title;
        this.content = content;
        this.detail = detail;
        this.orderIndex = orderIndex;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public String getDetail() { return detail; }
    public int getOrderIndex() { return orderIndex; }

    void setChapter(Chapter chapter) { this.chapter = chapter; }
}
