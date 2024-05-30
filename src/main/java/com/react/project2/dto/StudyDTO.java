package com.react.project2.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.react.project2.domain.Category;
import com.react.project2.domain.Member;
import com.react.project2.domain.Study;
import com.react.project2.domain.StudyMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudyDTO {
    private Long id;
    private String thImg;
    private String title;
    private String content;
    private String memberEmail;
    private String location;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-ddTHH:mm")
    private LocalDateTime studyDate;
    private String strStudyDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-ddTHH:mm")
    private LocalDateTime studyDeadlineDate;
    private String strStudyDeadlineDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-ddTHH:mm")
    private LocalDateTime createDate;
    private int maxPeople;
    private boolean disabled;
    private boolean isConfirmed;
    private Category category;
    // 스터디 참여자 목록
    private List<StudyMember> studyMemberList;


    public void changeStudyDate(String strStudyDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        this.studyDate = LocalDateTime.parse(strStudyDate, formatter);
    }


    // 생성자

}
