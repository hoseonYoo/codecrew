package com.react.project2.repository;

import com.react.project2.domain.Category;
import com.react.project2.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.File;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testInsert() {
        for (int i = 0; i < 100; i++) {

            String[] lastEmail = {"naver.com", "daum.net", "gmail.com", "kakao.com", "nate.com"};
            // 랜덤한 이메일을 생성하기 위한 배열
            String[] firstEmail = {"funny", "happy", "lazy", "smart", "stupid", "cool", "hot", "cold", "warm", "fast", "slow", "quick", "easy", "hard", "soft", "light", "heavy", "big", "small", "short", "long", "thick", "thin", "wide", "narrow", "deep", "shallow", "young", "old", "new", "late", "early", "good", "bad", "right", "wrong", "clean", "dirty", "dry", "wet", "fresh", "stale", "sweet", "sour", "bitter", "salty", "spicy", "mild", "sharp", "blunt", "smooth", "rough", "hard", "soft", "loud", "quiet", "noisy", "silent", "thirsty", "hungry", "tired", "sleepy", "awake", "sick", "healthy", "ill", "well", "hot", "cold", "warm", "cool", "dark", "light", "bright", "dull", "heavy", "light", "strong", "weak", "rich", "poor", "safe", "clean", "dirty", "dry", "wet", "fresh", "stale", "sweet", "sour", "bitter", "salty", "spicy", "mild", "sharp", "blunt", "smooth", "rough", "soft", "loud", "quiet", "noisy", "silent", "hungry", "tired", "sleepy", "awake", "sick", "healthy", "ill", "well", "hot", "cold", "warm", "cool", "dark", "light", "bright", "dull", "heavy", "light", "strong", "weak", "rich", "poor", "safe", "dangerous", "clean", "dirty", "dry", "wet", "fresh", "stale", "sweet", "sour", "bitter"};
            String[] middleEmail = {"apple", "banana", "cherry", "date", "egg", "fig", "grape", "honey", "ice", "jam", "kiwi", "lemon", "melon", "nut", "orange", "pear", "quince", "raspberry", "strawberry", "tomato", "watermelon", "yogurt", "zucchini"};
            Random random = new Random();

            // 서로다른 인덱스를 가진 랜덤한 두값이 나오도록 설정
            int randomFirstEmailIndex = random.nextInt(firstEmail.length);
            String randomEmail = firstEmail[randomFirstEmailIndex];
            int randomMiddleEmailIndex2 = random.nextInt(middleEmail.length);
            randomEmail += middleEmail[randomMiddleEmailIndex2];
            // 1 부터 12 사이의 랜덤한 숫자를 생성
            int randomNum = random.nextInt(12) + 1;
            randomEmail += randomNum;
            String randomEmail2 = randomEmail;
            randomEmail += "@";
            int randomLastEmailIndex = random.nextInt(lastEmail.length);
            randomEmail += lastEmail[randomLastEmailIndex];

            String[] firstName = {"김", "김", "김", "이", "박", "김", "이", "박", "김", "이", "박", "최", "김", "이", "박", "최", "김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권", "황", "안",};
            String[] middleName = {"준", "현", "석", "현", "혁", "형", "현", "혜", "효", "지", "진", "민", "석", "현", "혁", "형", "현", "혜", "효", "지", "진", "민", "석", "현", "혁", "형", "현", "혜", "효", "지", "진", "민", "석", "현", "혁", "형", "현", "혜", "효", "지", "진", "민", "석", "현", "혁", "형", "현", "혜", "효", "지", "진", "민", "석", "현", "혁", "형", "현", "혜", "효", "지", "진", "민", "석", "현", "혁", "형", "현", "혜", "효", "지", "진", "민", "석", "현", "혁", "형", "현", "혜", "효", "지", "진", "민", "석", "현", "혁", "형", "현", "혜", "효", "지", "진", "민"};
            int randomFirstNameIndex = random.nextInt(firstName.length);
            String randomName = firstName[randomFirstNameIndex];
            int randomMiddleNameIndex = random.nextInt(middleName.length);
            randomName += middleName[randomMiddleNameIndex];
            int randomMiddleNameIndex2 = random.nextInt(middleName.length);
            randomName += middleName[randomMiddleNameIndex2];

            // 랜덤한 자기소개를 생성하기 위한 배열
            String[] introduce = {"안녕하세요 ", "반가워요 ", "잘부탁드려요 ", "안녕 ", "반가워 "};
            int randomIntroduceIndex = random.nextInt(introduce.length);
            String randomIntroduce = introduce[randomIntroduceIndex];


            // "upload" 폴더에 있는 파일들을 불러옵니다.
            File folder = new File("upload"); // "upload" 폴더를 나타냅니다.
            File[] listOfFiles = folder.listFiles();

            // 랜덤한 이미지를 선택합니다.
            String randomImage = listOfFiles[(int) (Math.random() * listOfFiles.length)].getName();





            Member member = Member.builder()
                    .email(randomEmail)
                    .password(passwordEncoder.encode("1111"))
                    .nickname(randomName)
                    .profileImg(randomImage)
                    .introduction(randomIntroduce)
                    .memberLink("https://www." + randomEmail2 + ".com")
                    .build();

            memberRepository.save(member);
        }
    }

}