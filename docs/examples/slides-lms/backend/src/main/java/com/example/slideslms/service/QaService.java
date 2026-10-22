package com.example.slideslms.service;

import com.example.slideslms.entity.Course;
import com.example.slideslms.entity.Chapter;
import com.example.slideslms.entity.QaEntry;
import com.example.slideslms.entity.Slide;
import com.example.slideslms.repository.CourseRepository;
import com.example.slideslms.repository.QaEntryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QaService {

    private final QaEntryRepository qaRepository;
    private final CourseRepository courseRepository;
    private final AnswerProvider answerProvider;

    public QaService(QaEntryRepository qaRepository,
                     CourseRepository courseRepository,
                     AnswerProvider answerProvider) {
        this.qaRepository = qaRepository;
        this.courseRepository = courseRepository;
        this.answerProvider = answerProvider;
    }

    @Transactional
    public QaEntry ask(Long courseId, String question) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("课程不存在: " + courseId));
        String corpus = course.getChapters().stream()
                .flatMap((Chapter c) -> c.getSlides().stream())
                .map((Slide s) -> s.getTitle() + "\n" + s.getContent() + "\n" + (s.getDetail() == null ? "" : s.getDetail()))
                .collect(Collectors.joining("\n\n"));
        String answer = answerProvider.answer(question, corpus);
        return qaRepository.save(new QaEntry(course, question, answer));
    }

    @Transactional(readOnly = true)
    public List<QaEntry> history(Long courseId) {
        return qaRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
    }
}
