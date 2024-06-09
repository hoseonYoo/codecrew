package com.react.project2.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudyMember {

    // TODO : StudyMember Entity 수정

    private String email;

    private String title; // 제목

    private LocalDateTime createdDate; // 생성 날짜

    private boolean checked; // 확인 여부

    private String category; // 카테고리

    private String boardId; // 게시판 ID

    private String boardWriter; // 게시판 작성자

    private String boardWriterProfileImg; // 게시판 작성자 프로필 이미지

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StudyMember)) return false;
        StudyMember that = (StudyMember) o;
        return email != null && email.equals(that.email);
    }

    @Override
    public int hashCode() {
        return email != null ? email.hashCode() : 0;
    }

    // 이메일을 설정하는 메소드
    public void setEmail(String email) {
        this.email = email;
    }


}
