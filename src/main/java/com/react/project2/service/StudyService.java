package com.react.project2.service;


import com.react.project2.dto.StudyDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface StudyService {

    // 스터디 등록
    Long add(StudyDTO studyDTO);
    // 스터디 조회

    // 스터디 수정

    // 스터디 삭제

}
