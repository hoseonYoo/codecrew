import React, { useEffect, useState } from "react";
import { getOne } from "../../api/studyAPI";
import { API_SERVER_HOST, getMember } from "../../api/memberAPI";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/StudyReadPage.scss";
import "../../components/study/StudyMemberBlock";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useParams } from "react-router-dom";

// 스터디 저장값 초기화
const initState = {
  thImg: "th_d3a45401-c1b4-43f1-b4f0-8353237d7e25.png",
  title: "제목",
  content: "",
  memberEmail: "",
  memberNickname: "",
  memberPhone: "",
  location: "주소",
  studyDate: "날짜",
  maxPeople: 2,
  category: "",
};

const host = API_SERVER_HOST;

const ReadPage = () => {
  const { id } = useParams();
  const [study, setStudy] = useState(initState);
  const [imgStudySrc, setStudyImgSrc] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const { moveToPath } = useCustomLogin();

  const handleClickProfile = () => {
    moveToPath("/list/profile");
  };

  // 스터디 데이터 가져오기
  useEffect(() => {
    getOne(id).then((data) => {
      console.log(data);
      setStudy({ ...data });
      setStudyImgSrc(`${host}/api/image/view/${data.thImg}`);
    });
  }, [id]);

  // 작성자 프로필 가져오기
  useEffect(() => {
    getMember(study.memberEmail).then((res) => {
      // 초기 로딩시 카카오 프로필인지 여부 체크
      if (res.profileImg === "") {
      } else if (res.profileImg.startsWith("http")) {
        console.log("카카오 프로필");
        setImgSrc(res.profileImg);
      } else {
        console.log("일반 프로필");
        setImgSrc(`${host}/api/image/view/${res.profileImg}`);
      }
    });
  }, [study.memberEmail]);

  useEffect(() => {
    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("a485d66609c6ba8d3f85dd817c4e295d");
    }
  }, []);

  // 공유하기 버튼
  const handleShareClick = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: study.title,
        description: study.content,
        imageUrl: imgStudySrc,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
  };

  return (
    <BasicLayoutPage headerTitle="스터디">
      <div>
        <div className="ReadContent">
          <div className="ReadImg" style={imgStudySrc !== "" ? { backgroundImage: `url(${imgStudySrc})` } : null}></div>
          <div className="ReadTitle">
            <h3>{study.title}</h3>
            <p>{study.location}</p>
          </div>
          <div className="ReadBtn">
            <button className="btnSmallPoint">연락하기</button>
            <button className="btnSmallBlack" onClick={handleShareClick}>
              공유하기
            </button>
          </div>
        </div>

        <div className="ReadTextWrap">
          <div className="ReadText">
            <h3>작성자 : </h3>
            <div>
              <p>{study.memberNickname}</p>
              <p>{study.memberEmail}</p>
            </div>
          </div>
          <div className="ReadText">
            <h3>참여일자 : </h3>
            <p>{study.studyDate}</p>
          </div>
          <div className="ReadText">
            <h3>참여인원 : </h3>
            <p>
              1<span>/</span>
              {study.maxPeople}
            </p>
          </div>
        </div>

        <div className="ReadStudyText">
          <h2>스터디 소개</h2>
          <p>{study.content}</p>
        </div>

        <div className="ReadStudyText">
          <h2>참가자 리스트</h2>
          {/* 생성자 디폴트 */}
          <div className="studyMemberBlockWrap" onClick={handleClickProfile}>
            <div className="studyMemberBlockImg" style={imgSrc !== "" ? { backgroundImage: `url(${imgSrc})` } : null}></div>
            <div className="studyMemberBlockTitle">
              <h3>{study.memberNickname}</h3>
              <p>{study.memberEmail}</p>
            </div>
            <div className="studyMemberBlockBtn"></div>
          </div>
          {/* 생성자 디폴트 */}
          {/* 참가자 리스트 - 컴포넌트 */}
          {/* <StudyMemberBlock /> */}
        </div>

        {/* 기본 */}
        <div className="StudyJoinBtn">
          <button className="btnLargePoint">스터디참가</button>
        </div>
      </div>
    </BasicLayoutPage>
  );
};

export default ReadPage;
