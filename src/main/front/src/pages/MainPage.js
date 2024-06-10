import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import "../scss/pages/mainPage.scss";
import KakaoMap from "../components/map/KakaoMap";
import { useSelector } from "react-redux";
import useHandleParticipate from "../hooks/useHandleParticipate";
import useHandleParticipateCancel from "../hooks/useHandleParticipateCancel";
import useHandleDelete from "../hooks/useHandleDelete";
import useHandleStart from "../hooks/useHandleStart";
import useCustomMove from "../hooks/useCustomMove";

const MainPage = () => {
  // 현재 로그인 된 회원의 이메일 가져오기
  const loginState = useSelector((state) => state.loginSlice);
  // 페이지 이동을 위한 함수들
  const { moveToLogin, moveToMypage, moveToAddPage, moveToModifyPage, moveToReadPage, moveToProfilePage, moveToAddPageWithData } = useCustomMove();
  // 참가하기
  const handleParticipate = useHandleParticipate();
  // 삭제하기
  const handleDelete = useHandleDelete();
  const [overlayState, setOverlayState] = useState({
    overlayState: false,
    lat: 0,
    lng: 0,
  });
  const changeOverlayState = (lat, lng, check) => {
    setOverlayState({
      overlayState: check,
      lat: lat,
      lng: lng,
    });
  };

  // 시작하기
  const hadleStart = useHandleStart();

  // 참가취소(탈퇴)
  const handleParticipateCancel = useHandleParticipateCancel();

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
    id: "",
    thImg: "",
    title: "",
    location: "",
    memberNickname: "",
    memberEmail: "",
    memberPhone: "",
    studyDate: "",
    maxPeople: "",
    studyMemberList: [],
  };
  const userEmail = loginState.email;
  const [popup, setPopup] = useState(false);
  const [study, setStudy] = useState(popupInit);
  const [isCurrentUserAMember, setIsCurrentUserAMember] = useState(false);
  // study 상태가 변경될 때마다 실행됩니다.
  useEffect(() => {
    if (popup && study && study.studyMemberList) {
      const isMember = study.studyMemberList.some((member) => member.email === userEmail);
      console.log("set!");
      setIsCurrentUserAMember(isMember);
    }
  }, [study, userEmail, popup]);

  //popupData -> study로 명칭 변경
  const changePopup = (data) => {
    setStudy(data);
    setPopup(true);
  };

  // 본인 작성글 체크용
  const studyUserEmail = study.memberEmail;

  // // 카카오 공유하기
  // useEffect(() => {
  //   // Kakao SDK 초기화
  //   if (window.Kakao && !window.Kakao.isInitialized()) {
  //     window.Kakao.init("a485d66609c6ba8d3f85dd817c4e295d");
  //   }
  // }, []);

  // 공유하기 버튼
  const handleShareClick = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: study.title,
        description: study.content,
        imageUrl: study.thImg,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
  };

  return (
    <BasicLayout className="MainPageSet">
      <KakaoMap overlayState={overlayState} changeOverlayState={changeOverlayState} changePopup={changePopup} popupInit={popupInit} />

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
            <div className="MyNoticeCount">
              <span>1</span>
            </div>
          </button>
        </div>

        {/* 토스트팝업 */}
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
              <div className="stPopupImg" onClick={() => moveToReadPage(study.id)} style={{ backgroundImage: `url(${study.thImg})`, cursor: "pointer" }}></div>
              <div className="stPopupTitle">
                <h3 onClick={() => moveToReadPage(study.id)} style={{ cursor: "pointer" }}>
                  {study.title}
                </h3>
                <p
                  onClick={() => {
                    const confirmOpen = window.confirm("카카오지도를 여시겠습니까?");
                    if (confirmOpen) {
                      const encodedLocation = encodeURIComponent(study.location);
                      const kakaoMapUrl = `https://map.kakao.com/?q=${encodedLocation}`;
                      window.open(kakaoMapUrl, "_blank");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {study.location}
                </p>
              </div>
              <div className="stPopupBtn">
                {!userEmail || userEmail !== studyUserEmail ? (
                  <>
                    <button
                      className="btnSmallPoint"
                      onClick={() => {
                        if (study.memberPhone) {
                          window.location.href = `tel:${study.memberPhone}`;
                        } else {
                          alert("크루가 연락처를 공개하지 않았습니다.");
                        }
                      }}
                    >
                      연락하기
                    </button>

                    <button className="btnSmallBlack" onClick={handleShareClick}>
                      공유하기
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btnSmallPoint" onClick={() => moveToModifyPage(study.id)}>
                      수정하기
                    </button>
                    <button
                      className="btnSmallBlack"
                      onClick={() => {
                        handleDelete(study.id, study.memberEmail);
                        setPopup(false); // 버튼 클릭 시 바로 팝업을 닫습니다.
                      }}
                    >
                      삭제하기
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="stPopupContentBottom">
              <div>
                <h4>작성자 : </h4>
                <div>
                  <p onClick={() => moveToProfilePage(study.memberEmail)} style={{ fontSize: "15px", color: "#000", fontWeight: "600" }}>
                    {study.memberNickname}
                  </p>
                  <p onClick={() => (window.location.href = `mailto:${study.memberEmail}`)}>{study.memberEmail}</p>
                </div>
              </div>
              <div>
                <h4>참여일자 : </h4>
                <p>{study.studyDate}</p>
              </div>
              <div>
                <h4>참여확정 : </h4>
                <p
                  style={{
                    color:
                      (study.studyMemberList ? study.studyMemberList.filter((member) => member.checked).length : 0) + 1 > study.maxPeople
                        ? "#FF3333"
                        : (study.studyMemberList ? study.studyMemberList.filter((member) => member.checked).length : 0) + 1 === study.maxPeople
                        ? "#007BFF"
                        : "inherit", // 기본 색상
                  }}
                >
                  {(study.studyMemberList ? study.studyMemberList.filter((member) => member.checked).length : 0) + 1}
                  <span>/</span>
                  {study.maxPeople}
                </p>
              </div>
            </div>
            <div className="stPopupContentButton">
              {!userEmail || (userEmail !== studyUserEmail && !isCurrentUserAMember) ? (
                <button className="btnLargePoint" onClick={() => handleParticipate(study.id)}>
                  스터디참가
                </button>
              ) : null}
              {userEmail && userEmail !== studyUserEmail && isCurrentUserAMember && (
                <button className="btnLargeBlack" onClick={() => handleParticipateCancel(study.id)}>
                  스터디탈퇴
                </button>
              )}
              {userEmail === studyUserEmail && (
                <button
                  className="btnLargePoint"
                  onClick={() => {
                    hadleStart(study);
                  }}
                >
                  스터디시작
                </button>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* 토스트팝업 */}
        {/* popupActive <- 클래스 추가시 팝업 노출 */}
        {overlayState.overlayState ? (
          <div
            className="addPopupWrap"
            onClick={() => {
              changeOverlayState(0, 0, false);
            }}
          >
            <div className="stPopupWrap popupActive">
              {/* 닫기버튼 */}
              <img
                className="stPopupClose"
                onClick={() => {
                  changeOverlayState(0, 0, false);
                }}
                src="/assets/imgs/icon/ic_popup_cl.svg"
                alt="닫기버튼"
              />
              {/* 컨텐츠 */}
              <div className="stPopupContentBottom">
                <h3 className="addPopuph3">🧑🏻‍💻 스터디 추가</h3>
                <p className="addPopupp">해당 위치에 스터디를 추가하시겠습니까?</p>
              </div>
              <div className="stPopupContentButton addPopupBtn">
                <button
                  className="btnLargePoint"
                  onClick={() => {
                    moveToAddPageWithData(overlayState.lat, overlayState.lng);
                  }}
                >
                  예
                </button>
                <button
                  className="btnLargePointLine"
                  onClick={() => {
                    changeOverlayState(0, 0, false);
                  }}
                >
                  아니요
                </button>
              </div>
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
