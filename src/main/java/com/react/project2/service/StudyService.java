package com.react.project2.service;


import com.react.project2.dto.StudyDTO;
import com.react.project2.dto.StudyMarkerDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface StudyService {

    // 스터디 등록
    void add(StudyDTO studyDTO);

    // 스터디 조회
    StudyDTO get(Long id);
    // 스터디 수정

    // 스터디 삭제


    // 마커용 스터디 카테고리별 전체 조회
    List<StudyMarkerDTO> getStudyMarkerByCategory(String category);

    // 마커용 스터디 전체 조회
    List<StudyMarkerDTO> getStudyMarkerAll();

}
