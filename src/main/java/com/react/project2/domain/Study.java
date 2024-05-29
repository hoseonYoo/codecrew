package com.react.project2.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Study {

    @Id
    private String studyNo;

    // 썸네일 이미지
    @Column(nullable = false)
    private String profileImg = "";

    @Column(nullable = false)
    private String studyTitle;
    private String studyContent;
    private String studyOrganizer;

    // 장소 위치
    private int locationX;
    private int locationY;

    // 일정관련
    private LocalDateTime studyDate; // 모임일자
    private LocalDateTime studyDeadlineDate; // 마감일자
    private LocalDateTime createDate; // 생성일자

    private int studyMaxPeople; // 최대인원

}
