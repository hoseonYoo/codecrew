package com.react.project2.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Category {

    // TODO 카테고리 변경 예정
    FRONTSIDE("프론트"), BACKSIDE("백엔드"), FULLSTACK("풀스택"),
    ANDROID("안드로이드"), IOS("IOS"), AI("인공지능"), DATA("데이터"),
    SECURITY("보안"), GAME("게임"), ETC("기타");
    private final String value;

    public static Category builder(String value) {
        for (Category category : Category.values()) {
            if (category.getValue().equals(value)) {
                return category;
            }
        }
        return ETC;
    }
}
