package com.react.project2.repository;

import com.react.project2.domain.Category;
import com.react.project2.domain.Member;
import com.react.project2.domain.Study;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Slf4j
class StudyRepositoryTest {

    @Autowired
    private StudyRepository studyRepository;
    @Autowired
    private MemberRepository memberRepository;

    public String convertCoordinatesToAddress(double latitude, double longitude) {
        String apiKey = "32bb26db068923f19fd3390bbf77862a"; // 여기에 실제 API 키를 입력해야 합니다.
        String requestUrl = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=" + longitude + "&y=" + latitude;

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + apiKey);
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        ResponseEntity<String> response = restTemplate.exchange(requestUrl, HttpMethod.GET, entity, String.class);
        JSONObject jsonObject = null;
        try {
            jsonObject = new JSONObject(response.getBody());
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        String addressName = null;
        try {
            addressName = jsonObject.getJSONArray("documents").getJSONObject(0).getString("address_name");
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

        return addressName;
    }

    @Test
    public void testInsert() {
        for (int i = 0; i < 20; i++) {

            // 37.48449361322888 ~ 37.63316822429767 ~ 사이 랜덤값 생성
            double locationY = 37.48449361322888 + Math.random() * (37.63316822429767 - 37.48449361322888);
            // 126.8418569734938 ~ 127.04333829045339 사이 랜덤값 생성
            double locationX = 126.8418569734938 + Math.random() * (127.04333829045339 - 126.8418569734938);

            // 랜덤 카테고리 생성
            Category category = Category.values()[(int) (Math.random() * Category.values().length)];


            // 현재 시간 3일뒤부터 2주뒤 사이의 랜덤 시간 생성
            LocalDateTime studyDate = LocalDateTime.now().plusDays(3 + (long) (Math.random() * 14));
            // 현재시간 1일 뒤부터 studyDate 전날 사이의 랜덤 시간 생성
            LocalDateTime studyDeadlineDate = LocalDateTime.now().plusDays(1 + (long) (Math.random() * (studyDate.minusDays(1).getDayOfMonth() - 1)));

            // 전체회원 중 랜덤 회원 선택
            List<Member> members = memberRepository.findAll();
            Member randomMember = members.get((int) (Math.random() * members.size()));

            // 1~10 사이의 랜덤값 생성
            int randomPeople = (int) (Math.random() * 10) + 1;

            // 랜덤한 공부 모임 제목을 위한 배열
            String[] studyTitle = {"공부", "스터디", "모임"};

            // "upload" 폴더에 있는 파일들을 불러옵니다.
            File folder = new File("upload"); // "upload" 폴더를 나타냅니다.
            File[] listOfFiles = folder.listFiles();
            ArrayList<File> files = new ArrayList<>();
            //새로운 배열을 생성하고 "th_"로 시작하지 않는 파일들만 저장합니다.
            for (int j = 0; j < listOfFiles.length; j++) {
                if (listOfFiles[j].isFile()) {
                    if (!listOfFiles[j].getName().startsWith("th_")) {
                        files.add(listOfFiles[j]);
                    }
                }
            }


            // 랜덤한 이미지를 선택합니다.
            String randomImage = files.get((int) (Math.random() * files.size())).getName();


            Study study = Study.builder()
                    .thImg(randomImage)
                    .title(category.getValue() + " 스터디" + i)
                    .content("content" + i)
                    .location(convertCoordinatesToAddress(locationY, locationX))
                    .studyDeadlineDate(studyDeadlineDate)
                    .locationX(locationX)
                    .locationY(locationY)
                    .member(randomMember)
                    .studyDate(studyDate)
                    .maxPeople(randomPeople)
                    .category(category)
                    .build();

            studyRepository.save(study);
        }
    }

}