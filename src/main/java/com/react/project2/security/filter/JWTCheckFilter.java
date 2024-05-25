package com.react.project2.security.filter;

import com.google.gson.Gson;
import com.react.project2.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Slf4j
public class JWTCheckFilter extends OncePerRequestFilter {

    @Override
    // 필터 생략할것 지정하는 메서드 추가
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        // Pre-flight 요청은 필터링 하지 않음
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }

        String requestURI = request.getRequestURI();
        log.info("********* JWTCheckFilter - shouldNotFilter : requestURI : {}", requestURI);

        // TODO : 추가적으로 필터 체크 하지 않아야 할 경로 추가 필요

        //  /api/member/.. 경로는 필터링 하지 않음
        if (requestURI.startsWith("/api/member/")) {
            return true;
        }
        // 이미지 경로 요청은 필터 체크 하지 않음
        // TODO : 이미지 요청 경로 확인
        if (requestURI.startsWith("/api/view/")) {
            return true;
        }

        return false;
    }

    // 필터링 로직 작성 : 추상메서드로 구현 필수
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        log.info("************ JWTCheckFilter - doFilterInternal!");

        String authValue = request.getHeader("Authorization");
        log.info("************ JWTCheckFilter - doFilterInternal : authValue : {}", authValue);
        // Bearer Xxxxxxx 형태로 전달되는 토큰값을 추출
        try {
            String accessToken = authValue.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
            log.info("************ JWTCheckFilter - doFilterInternal : claims : {}", claims);

            filterChain.doFilter(request, response); // 다음필터 이동해라~
        } catch (Exception e) {
            // Access Token 검증 예외 처리
             log.error("************ JWTCheckFilter error");
             log.error(e.getMessage());

             // 에러라고 응답해줄 메세지 생성 -> 전송
            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

            response.setContentType("application/json");
            PrintWriter writer = response.getWriter();
            writer.println(msg);
            writer.close();
        }


    }
}
