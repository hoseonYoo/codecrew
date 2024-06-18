package com.react.project2.controller;

import com.react.project2.domain.Category;
import com.react.project2.dto.ImageDTO;
import com.react.project2.dto.StudyDTO;
import com.react.project2.dto.StudyMarkerDTO;
import com.react.project2.service.StudyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/map")
@RequiredArgsConstructor
@Slf4j
public class MapController {

    private final StudyService studyService;

    @GetMapping("/{category}")
    public List<StudyDTO> getMarkerLocation(@PathVariable("category") String category) {
        log.info("********** MapController GET /:category - category : {}", category);
        // Entity Category를 이용해서 해당 카테고리의 위치정보를 가져온다.
        // 이 정보를 이용해서 지도에 마커를 찍는다

        List<StudyDTO> studyMarkerByCategory = new ArrayList<>();
        studyMarkerByCategory = studyService.getStudyMarkerByCategory(category);
        log.info("********** MapController GET /:category - studyMarkerByCategory : {}", studyMarkerByCategory);


        return studyMarkerByCategory;
    }
}

