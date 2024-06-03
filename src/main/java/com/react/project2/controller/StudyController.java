package com.react.project2.controller;

import com.react.project2.dto.StudyDTO;
import com.react.project2.service.StudyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequestMapping("api/study")
@RequiredArgsConstructor
public class StudyController {
    private final StudyService studyService;

    // 스터디 등록
    @PostMapping("/")
    public Map<String, String> add(StudyDTO studyDTO){
        log.info("**** StudyController POST / add {} ****", studyDTO);
        studyService.add(studyDTO);
        return Map.of("RESULT", "SUCCESS");
    }
    // 스터디 전부 조회

    // 스터디 조회
    @GetMapping("/{id}")
    public StudyDTO get(@PathVariable("id") Long id){
        log.info("스터디 id 값은 : {}", id);
        StudyDTO studyDTO = studyService.get(id);
        log.info("----GETSTUDYID----");
        return studyDTO;
    }
}
