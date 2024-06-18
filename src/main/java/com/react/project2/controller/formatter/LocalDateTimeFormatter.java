package com.react.project2.controller.formatter;

import org.springframework.format.Formatter;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;


// 포매팅 할때 사용될 포매터 작성 -> 적용되도록 설정 추가 필요
public class LocalDateTimeFormatter implements Formatter<LocalDateTime> {

    // 문자열날짜 -> LocalDateTime 타입으로 변환
    @Override
    public LocalDateTime parse(String text, Locale locale) throws ParseException {
        // 2025/05/05 12:00:00 -> "yyyy/MM/dd HH:mm:ss", 2025-05-05T12:00:00 -> "yyyy-MM-dd'T'HH:mm:ss"
        return LocalDateTime.parse(text, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));
    }

    // LocalDateTime -> 문자열날짜로 변환
    @Override
    public String print(LocalDateTime object, Locale locale) {
        return DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss").format(object);
    }
}
