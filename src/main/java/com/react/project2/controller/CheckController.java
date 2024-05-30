package com.react.project2.controller;

import com.react.project2.dto.DataMemberDTO;
import com.react.project2.dto.MemberDTO;
import com.react.project2.service.MemberService;
import com.react.project2.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/check")
public class CheckController {

    private final MemberService memberService;

    @GetMapping("/phone/{phone}")
    public String getMemberFromKakao(@PathVariable("phone") Long phone) {
        log.info("**************SocialController-getMemberFromKakao - phone: {}",
                phone);
        DataMemberDTO memberByPhone = memberService.findMemberByPhone(phone);
        if (memberByPhone != null) {
            return "exist";
        }

        return "not exist";
    }
}
