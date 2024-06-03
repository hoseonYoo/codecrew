package com.react.project2.repository;

import com.react.project2.domain.Category;
import com.react.project2.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Long> {

    // 현재 날짜보다 Deadline이 더 늦고 isConfirmed이 false인 스터디 카테고리별 조회
    @Query("select s from Study s where s.studyDeadlineDate > current_date and s.isConfirmed = false and s.category = :category")
    List<Study> findAllByCategory(Category category);



    // 스터디 조회
    @Query("select s from Study s where s.id = :id")
    Optional<Study> selectOneById(@Param("id")Long id);

}
