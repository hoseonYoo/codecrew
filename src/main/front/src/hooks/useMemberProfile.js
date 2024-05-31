import { useEffect, useState } from "react";
import { API_SERVER_HOST, getMember } from "../api/memberAPI";
import useCustomLogin from "./useCustomLogin";

const useMemberProfile = (userEmail) => {
  const initState = {
    email: "",
    nickname: "",
    phone: "",
    profileImg: "",
    memberLink: "",
    introduction: "",
    favoriteList: [],
    noticeList: [],
    penalty: 0,
    blockedDate: "",
  };
  const [member, setMember] = useState(initState);
  const [imgSrc, setImgSrc] = useState("");
  const { exceptionHandle } = useCustomLogin();
  const host = API_SERVER_HOST;

  useEffect(() => {
    getMember(userEmail)
      .then((res) => {
        // 초기 로딩시 카카오 프로필인지 여부 체크
        if (res.profileImg === "") {
        } else if (res.profileImg.startsWith("http")) {
          console.log("카카오 프로필");
          setImgSrc(res.profileImg);
        } else {
          console.log("일반 프로필");
          setImgSrc(`${host}/api/image/view/${res.profileImg}`);
        }
        setMember({ ...res });
      })
      .catch((err) => exceptionHandle(err));
  }, [userEmail]);

  // 회원 정보와 출력용 이미지 주소를 반환
  return { member, imgSrc };
};

export default useMemberProfile;
