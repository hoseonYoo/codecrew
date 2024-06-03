import { useEffect, useState } from "react";
import { API_SERVER_HOST, getOne } from "../api/studyAPI";

const useStudyData = (id) => {
  // 스터디 저장값 초기화
  const initState = {
    thImg: "",
    title: "제목",
    content: "설명글",
    memberEmail: "",
    memberNickname: "작성자닉네임",
    memberPhone: "작성자연락처",
    location: "주소",
    studyDate: "날짜",
    maxPeople: 2,
    category: "", // 빈 배열로 초기화
  };

  const [study, setStudy] = useState(initState);
  const [imgStudySrc, setStudyImgSrc] = useState("");
  const host = API_SERVER_HOST;

  // 스터디 데이터 가져오기
  useEffect(() => {
    getOne(id)
      .then((data) => {
        if (data) {
          // data가 유효한지 확인
          setStudyImgSrc(`${host}/api/image/view/${data.thImg}`);
          setStudy({ ...data });
        }
      })
      .catch((error) => {
        console.error("데이터 불러오는 중...", error);
      });
  }, [id, host]); // host를 의존성 배열에 추가

  // 리턴
  return { study, imgStudySrc };
};

export default useStudyData;
