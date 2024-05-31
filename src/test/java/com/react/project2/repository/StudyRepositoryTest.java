package com.react.project2.repository;

import com.react.project2.domain.Category;
import com.react.project2.domain.Study;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Slf4j
class StudyRepositoryTest {

    @Autowired
    private StudyRepository studyRepository;

    @Test
    public void testInsert() {
        for (int i = 0; i < 1000; i++) {

            // 37.57163048751097, 126.9768859784546

//            37.57163048750000 ~ 37.57163048759000 사이 랜덤값 생성
            double locationY = 37.57163048750000 + Math.random() * (37.57163048759000 - 37.57163048750000);
// 126.9768859784500 ~ 126.9768859784600 사이 랜덤값 생성
            double locationX = 126.9768859784500 + Math.random() * (126.9768859784600 - 126.9768859784500);

            // 현재 시간 부터 2주뒤 사이의 랜덤 시간 생성
            LocalDateTime studyDate = LocalDateTime.now().plusDays((long) (Math.random() * 14));
            // studyDate 부터 1일 뒤 사이의 랜덤 시간 생성
            LocalDateTime studyDeadlineDate = studyDate.plusDays((long) (Math.random() * 1));


            Study study = Study.builder()
                    .thImg("http://k.kakaocdn.net/dn/RF8yG/btsHJAyluMZ/6PBluJnX4JhhVOY47cJcx0/img_640x640.jpg")
                    .title("title" + i)
                    .content("content" + i)
                    .location("location" + i)
                    .studyDeadlineDate(studyDeadlineDate)
                    .locationX(locationX)
                    .locationY(locationY)
                    .studyDate(studyDate)
                    .maxPeople(10)
                    .category(Category.AI)
                    .build();

            studyRepository.save(study);
        }
    }

}