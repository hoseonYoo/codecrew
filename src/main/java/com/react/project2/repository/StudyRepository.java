package com.react.project2.repository;

import com.react.project2.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<Study, Long> {
    // 회원등록
}
