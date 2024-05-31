package com.react.project2.repository;

import com.react.project2.domain.Category;
import com.react.project2.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

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
        for(int i = 0; i < 10; i++) {
            Member member = Member.builder()
                    .email("user" + i + "@test.com")
                    .password(passwordEncoder.encode("1111"))
                    .nickname("사용자" + i)
                    .build();


            memberRepository.save(member);
        }
    }

}