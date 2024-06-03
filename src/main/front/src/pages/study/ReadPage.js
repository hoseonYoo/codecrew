import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/StudyReadPage.scss";
import "../../components/study/StudyMemberBlock";
import React, { useEffect } from "react";
import { API_SERVER_HOST } from "../../api/studyAPI";
import useCustomMove from "../../hooks/useCustomMove";
import useStudyData from "../../hooks/useStudyData";
import useMemberProfile from "../../hooks/useMemberProfile";
import { useParams } from "react-router-dom";

const host = API_SERVER_HOST;

const ReadPage = () => {
  const { id } = useParams();
  // 스터디 정보 가져오기
  const { study, imgStudySrc } = useStudyData(id);

  // 수정이 필요없는 조회용 회원 정보 가져오기
  const userEmail = study.memberEmail;
  console.log(userEmail);
  // const { member, imgSrc } = useMemberProfile(userEmail);

  // 클릭 이동관련
  const { moveToProfilePage } = useCustomMove();

  // 카카오 공유하기
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
            <button className="btnSmallPoint" onClick={() => (window.location.href = `tel:${study.memberPhone}`)}>
              연락하기
            </button>

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
          <div className="studyMemberBlockWrap" onClick={moveToProfilePage}>
            <div className="studyMemberBlockImg"></div>
            {/* <div className="studyMemberBlockImg" style={imgSrc !== "" ? { backgroundImage: `url(${imgSrc})` } : null}></div> */}
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
