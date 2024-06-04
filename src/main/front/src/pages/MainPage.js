import React, { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import "../scss/pages/mainPage.scss";
import NewKakaoMap from "../components/map/newKakaoMap";
import FinalKakaoMap from "../components/map/finalKakaoMap";
import { useSelector } from "react-redux";
import useCustomMove from "../hooks/useCustomMove";

const MainPage = () => {
  // 현재 로그인 된 회원의 이메일 가져오기
  const loginState = useSelector((state) => state.loginSlice);

  // 페이지 이동을 위한 함수들
  const { moveToLogin, moveToMypage, moveToAddPage } = useCustomMove();

  // my 아이콘 클릭시 로그인 여부에 따라 마이페이지로 이동
  const handleLogin = (moveFunction) => {
    if (!loginState.email) {
      moveToLogin();
    } else {
      moveFunction();
    }
  };

  // 토스트팝업 상태
  const popupInit = {
    thImg: "",
    title: "프로젝트 모임",
    location: "서울 서대문구 신촌로 83",
    memberNickname: "김유저",
    memberEmail: "dbghtjs112@naver.com",
    studyDate: "2024.05.22",
    maxPeople: "10/2",
  };
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState(popupInit);
  const changePopup = (data) => {
    setPopupData(data);
    setPopup(true);
  };

  return (
    <BasicLayout>
      {/*<div id="map" className="Map"></div>*/}
      {/*<NewKakaoMap />*/}
      <FinalKakaoMap changePopup={changePopup} popupInit={popupInit} />

      <div className="bottomMainBtnWrap">
        <div className="mainBtnWrap">
          <button
            onClick={() => {
              handleLogin(moveToAddPage);
            }}
          >
            스터디추가
          </button>
          <button
            onClick={() => {
              handleLogin(moveToMypage);
            }}
          >
            MY
          </button>
        </div>

        {/* 토스트팝업 */}
        {/* popupActive <- 클래스 추가시 팝업 노출 */}
        {popup ? (
          <div className="stPopupWrap popupActive">
            {/* 닫기버튼 */}
            <img
              className="stPopupClose"
              onClick={() => {
                setPopup(false);
              }}
              src="/assets/imgs/icon/ic_popup_cl.svg"
              alt="닫기버튼"
            />
            {/* 컨텐츠 */}
            <div className="stPopupContentTop">
              <div
                className="stPopupImg"
                style={{ backgroundImage: `url(${popupData.thImg})` }}
              ></div>
              <div className="stPopupTitle">
                <h3>{popupData.title}</h3>
                <p>{popupData.location}</p>
              </div>
              <div className="stPopupBtn">
                <button className="btnSmallPoint">연락하기</button>
                <button className="btnSmallBlack">공유하기</button>
              </div>
            </div>
            <div className="stPopupContentBottom">
              <div>
                <h4>작성자 : </h4>
                <div>
                  <p>{popupData.memberNickname}</p>
                  <p className="contentEmail">{popupData.memberEmail}</p>
                </div>
              </div>
              <div>
                <h4>참여일자 : </h4>
                <p>{popupData.studyDate}</p>
              </div>
              <div>
                <h4>참여인원 : </h4>
                <p>{popupData.maxPeople}</p>
              </div>
            </div>
            <div className="stPopupContentButton">
              <button className="btnLargePoint">스터디참가</button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="stPopupWrap"></div>
      </div>
    </BasicLayout>
  );
};
export default MainPage;
