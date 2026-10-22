package com.example.slideslms.repository;

import com.example.slideslms.entity.Slide;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SlideRepository extends JpaRepository<Slide, Long> {
    List<Slide> findByChapterIdOrderByOrderIndexAsc(Long chapterId);
}
