package com.react.project2.service;

import com.react.project2.domain.Member;
import com.react.project2.dto.MemberDTO;
import com.react.project2.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public MemberDTO getKakaoMember(String accessToken) {
        String email = getEmailFromKakaoAccessToken(accessToken);
        log.info("************ MemberService - getKakaoMember -email : {}", email);

        // DB에 회원이 있는지 조회
        Optional<Member> findMember = memberRepository.findById(email);
        // 기존회원 -> 로그인
        if (findMember.isPresent()) {
            MemberDTO memberDTO = entityToDto(findMember.get());
            return memberDTO;
        }
        // 신규회원 -> 회원가입
        // 임시 비번으로 회원 DB에 저장, 해당 정보로 memberDTO 생성해서 리턴
        Member socialMember = makeSocialMember(email); // 소셜회원으로 만들어 받기
        MemberDTO memberDTO = entityToDto(socialMember);
        return memberDTO;
    }

    // 소셜회원 정보로 Member Entity 생성
    private Member makeSocialMember(String email) {
        // 임시비번 만들어서 Member 엔티티 생성해 리턴
        String tmpPassword = makeTempPassword();
        log.info("****** MemberService - tmpPassword : {}", tmpPassword);
        // TODO 카카오 계정 정보 받아서 Member 엔티티 생성
        String nickname = "SocialMember";
        Member member = Member.builder()
                        .email(email)
                        .password(passwordEncoder.encode(tmpPassword))
                        .nickname(nickname)
                        .build();
        return member;
    }

    // 임시비번 만들어주는 메서드
    private String makeTempPassword() {
        // char 한글자씩 랜덤으로 누적 추가해서 문자열 만들어주기
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < 10; i++) {
            stringBuffer.append((char) ((int) (Math.random() * 55) + 65));
        }
        return stringBuffer.toString(); // 문자열로 리턴
    }


    private String getEmailFromKakaoAccessToken(String accessToken) {
// 카카오 사용자 정보 요청
        String kakakoGetUserURL = "https://kapi.kakao.com/v2/user/me";
        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }
        // 카카오서버에 RestTemplate 으로 사용자 정보 HTTP 요청
        RestTemplate restTemplate = new RestTemplate();
        // 헤더정보 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        // 헤더 정보를 포함함 HttpEntity로 요청 객체 만들기 (request)
        HttpEntity<String> entity = new HttpEntity<>(headers);
        // 요청 경로 생성해주는 클래스 이용
        UriComponents uriBuild =
                UriComponentsBuilder.fromHttpUrl(kakakoGetUserURL).build();
        // RestTemplate의 exchange() 메서드를 이용해 요청보내기 -> 리턴은 Map
        ResponseEntity<LinkedHashMap> response =
                restTemplate.exchange(uriBuild.toString(), HttpMethod.GET, entity,
                        LinkedHashMap.class);
        log.info("******** response : {}", response);
        // Body에서 응답 데이터 꺼내기
        LinkedHashMap<String, LinkedHashMap> body = response.getBody();
        log.info("******** body : {}", body);
        // 응답 내용 중 카카오 계정 정보 꺼내기
        LinkedHashMap<String, String> kakaoAccount = body.get("kakao_account");
        log.info("******** kakaoAccount : {}", kakaoAccount);
        return kakaoAccount.get("email"); // 이메일만 꺼내서 리턴
    }

}
