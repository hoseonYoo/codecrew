package com.react.project2.controller;

import com.react.project2.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notice")
@Slf4j
@RequiredArgsConstructor
public class NoticeController {

    private final MemberService memberService;

    // 알람 갯수조회
    @GetMapping("/count/{email}")
    public int getNoticeCount(@PathVariable("email") String email) {
        log.info("**** NoticeController GET /count/{email} {} ****", email);
        int noticeCount = memberService.getNoticeCount(email);
        log.info("**** NoticeController GET /count/{email} noticeCount : {} ****", noticeCount);
        return noticeCount;
    }
}
