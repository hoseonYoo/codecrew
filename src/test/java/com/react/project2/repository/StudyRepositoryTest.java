package com.react.project2.repository;

import com.react.project2.domain.*;
import com.react.project2.service.MemberStatusServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@SpringBootTest
@Slf4j
class StudyRepositoryTest {

    @Autowired
    private StudyRepository studyRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberStatusServiceImpl memberStatusService;

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

    // 테스트용 스터디 생성기
    @Test
    public void testInsert() {
        for (int i = 0; i < 200; i++) {

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
            String[] studyTitle = {" 공부", " 스터디", " 모임"};
            // 랜덤한 공부 모임 제목 생성
            String title = studyTitle[(int) (Math.random() * studyTitle.length)];

            // "upload" 폴더에 있는 파일들을 불러옵니다.

            File folder = new File("upload/studyImg"); // "upload" 폴더를 나타냅니다.
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
                    .title(category.getValue() + title + i)
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

    // 테스트용 스터디 멤버 생성기
    @Test
    @Transactional
    @Rollback(false)
    public void testInsertStudyMember() {
        List<Study> studies = studyRepository.findAll();
        studies.forEach(study -> {
            log.info("study = {}", study.getId());
            // 전체 회원 조회
            List<Member> members = memberRepository.findAll();
            // 전체 회원 에서 스터디 생성자 제외
            Member createMember = study.getMember();
            members.remove(createMember);

            // 1 부터 스터디의 최대 인원수 - 1 사이의 랜덤값 생성
            int randomPeople = (int) (Math.random() * (study.getMaxPeople() - 1)) + 1;
            log.info("randomPeople = {}", randomPeople);
            // 랜덤 인원수 만큼 스터디 멤버 추가 반복
            for (int i = 0; i < randomPeople; i++) {
                // 멤버 리스트에서 랜덤으로 멤버 뽑기
                log.info( i + " 번째 멤버 추가");
                Member randomMember = members.get((int) (Math.random() * members.size()));
                log.info("randomMember = {}", randomMember.getEmail());
                // 해당 랜덤 멤버 스터디 멤버로 추가
                StudyMember newMember = new StudyMember();
                newMember.setEmail(randomMember.getEmail());
                study.addStudyMember(newMember);
//                log.info("study memberList = {}", study.getStudyMemberList());
                // 스터디 멤버 추가 후 전체 회원 리스트에서 해당 멤버 제거
                members.remove(randomMember);
                // 추가한 스터디 멤버 상태 ACCPET로 변경
                memberStatusService.changeMemberStatus(study.getId(), randomMember.getEmail(), MemberStatus.ACCEPT);

            }


            studyRepository.save(study);
        });

    }

}