package com.react.project2.service;

import com.react.project2.domain.Member;
import com.react.project2.dto.MemberDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface MemberService {

    // 카카오에 회원 정보 요청
    MemberDTO getKakaoMember(String accessToken);

    // Member Entity -> MemberDTO
    default MemberDTO entityToDto(Member member){
        MemberDTO memberDTO = new MemberDTO(
            member.getEmail(),
            member.getPassword(),
            member.getNickname(),
            member.getProfileImg(),
            member.isDisabled(),
            member.getRole().toString()
        );
        return memberDTO;
    }

}
