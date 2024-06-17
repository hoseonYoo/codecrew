package com.react.project2.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberStatus {
    HOLD("대기"), ACCEPT("수락"),DECLINE("거절"),WITHDRAW("탈퇴"),ARRIVE("출석"),ABSENCE("결석"),LATE("지각");
    private final String value;

    public static MemberStatus builder(String value) {
        for (MemberStatus memberStatus : MemberStatus.values()) {
            if (memberStatus.getValue().equals(value)) {
                return memberStatus;
            }
        }
        return null;
    }
}