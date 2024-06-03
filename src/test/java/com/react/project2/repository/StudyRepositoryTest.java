package com.react.project2.repository;

import com.react.project2.domain.Category;
import com.react.project2.domain.Member;
import com.react.project2.domain.Study;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Slf4j
class StudyRepositoryTest {

    @Autowired
    private StudyRepository studyRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void testInsert() {
        for (int i = 0; i < 500; i++) {

            // 37.57163048751097, 126.9768859784546

//            37.58 ~ 37.59 사이 랜덤값 생성
            double locationY = 37.000000 + Math.random() * (38.000000 - 37.000000);
// 126.9668859784500 ~ 126.9868859784600 사이 랜덤값 생성
            double locationX = 126.000000 + Math.random() * (127.000000 - 126.000000);



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
                    .member(memberRepository.findByEmail("comejun@naver.com").get())
                    .studyDate(studyDate)
                    .maxPeople(10)
                    .category(Category.AI)
                    .build();

            studyRepository.save(study);
        }
    }

}