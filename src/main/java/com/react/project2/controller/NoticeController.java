package com.react.project2.controller;

import com.react.project2.dto.NoticeDTO;
import com.react.project2.dto.PageRequestDTO;
import com.react.project2.service.MemberService;
import com.react.project2.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notice")
@Slf4j
@RequiredArgsConstructor
public class NoticeController {

    private final MemberService memberService;
    private final NoticeService noticeService;

    // 알람 갯수조회
    @GetMapping("/count/{email}")
    public int getNoticeCount(@PathVariable("email") String email) {
        log.info("**** NoticeController GET /count/{email} {} ****", email);
        int noticeCount = memberService.getNoticeCount(email);
        log.info("**** NoticeController GET /count/{email} noticeCount : {} ****", noticeCount);
        return noticeCount;
    }

    // 알람 리스트 조회
    @GetMapping("/list/{email}")
    public List<NoticeDTO> listMember(@PathVariable("email") String memberEmail) {
        log.info("******* StudyController - list/email : {}", memberEmail);
        List<NoticeDTO> noticeList = noticeService.getNoticeList(memberEmail);
        return noticeList;
    }

    // 알람 삭제
    @DeleteMapping("/{email}/{noticeId}")
    public void deleteNotice(@PathVariable("email") String email, @PathVariable("noticeId") Long noticeId) {
        log.info("**** NoticeController DELETE /{email}/{noticeId} {} ****", email, noticeId);
        noticeService.deleteNotice(email, noticeId);
    }
}
