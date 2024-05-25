package com.react.project2.security.handler;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Slf4j
public class CustomLoginFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        // 로그인 실패시 실행될 로직
        log.info("********** CustomLoginFailureHandler - login fail!!");

        // 응답 데이터 생성 -> 에러 메세지
        Gson gson = new Gson();
        String jsonStr = gson.toJson(Map.of("error", "ERROR_LOGIN"));

        // 응답하기 (응답 메세지를 보내기)
        response.setContentType("application/json");
        PrintWriter writer = response.getWriter();
        writer.println(jsonStr);
        writer.close();
    }
}
