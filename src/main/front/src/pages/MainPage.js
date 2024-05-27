import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import "../scss/pages/mainPage.scss";
import { useNavigate } from "react-router-dom";
import KakaoMap from "../components/map/kakaoMap";

const MainPage = () => {
  const navigate = useNavigate();
  const moveToMypage = () => {
    navigate("/mypage");
  };
  const moveToAddPage = () => {
    navigate("/list/add");
  };

  return (
    <BasicLayout>
      {/* <div id="map" className="Map"></div> */}
      <KakaoMap />
      <div className="bottomBtnWrap">
        <div className="mainBtnWrap">
          <button onClick={moveToAddPage}>스터디추가</button>
          <button onClick={moveToMypage}>MY</button>
        </div>

        {/* 토스트팝업 */}
        {/* popupActive <- 클래스 추가시 팝업 노출 */}
        <div className="stPopupWrap">
          {/* 닫기버튼 */}
          <img className="stPopupClose" src="../assets/imgs/icon/ic_popup_cl.svg" />
          {/* 컨텐츠 */}
          <div className="stPopupContentTop">
            <div className="stPopupImg"></div>
            <div className="stPopupTitle">
              <h3>프로젝트 모임</h3>
              <p>서울 서대문구 신촌로 83</p>
            </div>
            <div className="stPopupBtn">
              <button className="btnSmallPoint">공유하기</button>
              <button className="btnSmallBlack">연락하기</button>
            </div>
          </div>
          <div className="stPopupContentBottom">
            <div>
              <h4>작성자 : </h4>
              <div>
                <p>김유저</p>
                <p className="contentEmail">dbghtjs112@naver.com</p>
              </div>
            </div>
            <div>
              <h4>참여일자 : </h4>
              <p>2024.05.22</p>
            </div>
            <div>
              <h4>참여인원 : </h4>
              <p>10/2</p>
            </div>
          </div>
          <div className="stPopupContentButton">
            <button className="btnLargePoint">스터디참가</button>
          </div>
        </div>
        {/* 토스트팝업 */}
      </div>
    </BasicLayout>
  );
};
export default MainPage;
