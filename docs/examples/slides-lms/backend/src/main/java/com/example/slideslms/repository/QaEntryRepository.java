package com.example.slideslms.repository;

import com.example.slideslms.entity.QaEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QaEntryRepository extends JpaRepository<QaEntry, Long> {
    List<QaEntry> findByCourseIdOrderByCreatedAtDesc(Long courseId);
}
