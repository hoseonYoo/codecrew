package com.react.project2.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.react.project2.domain.NoticeType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDTO {
    private Long NoticeId; // 알림키
    private String memberEmail; // 회원 ID
    private String title; // 제목
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdDate;
    private boolean deleted; // 삭제 여부
    private String studyId; // 게시판 ID
    private String studyWriter; // 게시판 작성자
    private NoticeType noticeType; // 공지 유형
}
