package com.react.project2.security;

import com.react.project2.domain.Member;
import com.react.project2.dto.MemberDTO;
import com.react.project2.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    // username(email)로 회원 정보 DB에서 조회 -> MemberDTO(UserDetails)로 변환해 리턴
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 매개변수 username (시큐리티명칭) == email (우리 Member 엔티티의 필드명)
        log.info("********* CustomUserDetailsService/loadUserByUsername - username : {}", username);

        Member member = memberRepository.getMemberWithFavoriteList(username);
        if (member == null) {
            throw new UsernameNotFoundException("Email(username) Not Found");
        }

        // Member 엔티티를 MemberDTO로 변환하여 리턴
        MemberDTO memberDTO = new MemberDTO(member.getEmail(),
                member.getPassword(),
                member.getNickname(),
                member.getProfileImg(),
                member.isDisabled(),
                member.getRole().toString());

        log.info("********* CustomUserDetailsService/loadUserByUsername - memberDTO : {}", memberDTO);

        return memberDTO;
    }


}
