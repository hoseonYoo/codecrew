import React from "react";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/StudyReadPage.scss";

const ReadPage = () => {
  return (
    <BasicLayoutPage headerTitle="스터디">
      <div>
        <div className="ReadContent">
          <div className="ReadImg"></div>
          <div className="ReadTitle">
            <h3>프로젝트 모임</h3>
            <p>서울 서대문구 신촌로 83</p>
          </div>
          <div className="ReadBtn">
            <button className="btnSmallPoint">연락하기</button>
            <button className="btnSmallBlack">공유하기</button>
          </div>
        </div>

        <div className="ReadTextWrap">
          <div className="ReadText">
            <h3>작성자 : </h3>
            <div>
              <p>김유저</p>
              <p>dbghtjs112@naver.com</p>
            </div>
          </div>
          <div className="ReadText">
            <h3>참여일자 : </h3>
            <p>2024.05.30</p>
          </div>
          <div className="ReadText">
            <h3>참여인원 : </h3>
            <p>
              0<span>/</span>10
            </p>
          </div>
        </div>

        <div className="ReadStudyText">
          <h2>스터디 소개</h2>
          <p>
            안녕하세요~ 저희 프로젝트 컨셉은 결혼은 웨딩 플래너에게 맡기듯 주거와 관련된 부동산 중개 계약 및 이사, 청소 생활과 관련된 서비스를 집 플래너가 문제 해결을 도와 드리는 원스톱 주거 서비스
            프로젝트를 시작할 예정입니다!
          </p>
        </div>

        <div className="ReadStudyText">
          <h2>참가자 리스트</h2>
        </div>

        <div className="StudyJoinBtn">
          <button className="btnLargePoint">스터디참가</button>
        </div>
      </div>
    </BasicLayoutPage>
  );
};

export default ReadPage;
