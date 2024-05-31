package com.react.project2.repository;

import com.react.project2.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Long> {
    // 스터디 조회
    @Query("select s from Study s where s.id = :id")
    Optional<Study> selectOneById(@Param("id")Long id);

}
