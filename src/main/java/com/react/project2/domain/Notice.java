package com.react.project2.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Embeddable
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notice {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long noticeId; // 알림키
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "member_email")
        private Member member; // 회원 ID
        private String title; // 제목
        @Builder.Default
        private LocalDateTime createdDate = LocalDateTime.now(); // 생성 날짜
        private boolean deleted; // 삭제 여부
        private String studyId; // 게시판 ID
        private String studyWriter; // 게시판 작성자
        @Enumerated(EnumType.STRING)
        private NoticeType noticeType; // 공지 유형
}