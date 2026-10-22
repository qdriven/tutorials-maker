package com.example.slideslms.controller;

import com.example.slideslms.entity.Course;
import com.example.slideslms.entity.Slide;
import com.example.slideslms.repository.CourseRepository;
import com.example.slideslms.repository.SlideRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseController {

    private final CourseRepository courseRepository;
    private final SlideRepository slideRepository;

    public CourseController(CourseRepository courseRepository, SlideRepository slideRepository) {
        this.courseRepository = courseRepository;
        this.slideRepository = slideRepository;
    }

    /** EARS-1：课程列表（含章节树与幻灯片） */
    @GetMapping("/courses")
    @Transactional(readOnly = true)
    public List<Course> courses() {
        return courseRepository.findAll();
    }

    /** EARS-2/3：章节幻灯片，按 order_index 升序 */
    @GetMapping("/chapters/{id}/slides")
    public List<Slide> chapterSlides(@PathVariable Long id) {
        return slideRepository.findByChapterIdOrderByOrderIndexAsc(id);
    }
}
