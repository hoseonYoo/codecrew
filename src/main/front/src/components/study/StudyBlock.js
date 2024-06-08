import React from "react";
import "../../scss/partials/StudyBlock.scss";
import { API_SERVER_HOST } from "../../api/memberAPI";
import useCustomMove from "../../hooks/useCustomMove";
import { useSelector } from "react-redux";
import useHandleParticipate from "../../hooks/useHandleParticipate";
import useHandleStart from "../../hooks/useHandleStart";

const StudyBlock = ({ studyLocation }) => {
  const host = API_SERVER_HOST;
  const { moveToReadPage } = useCustomMove();
  const loginState = useSelector((state) => state.loginSlice);

  const userEmail = loginState.email;
  const studyUserEmail = studyLocation.memberEmail;

  // 참가하기
  const handleParticipate = useHandleParticipate();
  // 시작하기
  const handleStart = useHandleStart();

  return (
    <div className="studyBlockWrap">
      <div
        className="studyBlockImg"
        style={{
          cursor: "pointer", // 커서 스타일 추가
          backgroundImage: studyLocation.thImg.startsWith("http:") ? `url(${studyLocation.thImg})` : `url(${host}/api/image/view/${studyLocation.thImg})`,
        }}
      ></div>

      <div className="studyBlockTitle" style={{ cursor: "pointer" }}>
        <h3 onClick={() => moveToReadPage(studyLocation.id)}>{studyLocation.title}</h3>
        <p
          onClick={() => {
            const confirmOpen = window.confirm("카카오지도를 여시겠습니까?");
            if (confirmOpen) {
              const encodedLocation = encodeURIComponent(studyLocation.location);
              const kakaoMapUrl = `https://map.kakao.com/?q=${encodedLocation}`;
              window.open(kakaoMapUrl, "_blank");
            }
          }}
          style={{ cursor: "pointer" }}
        >
          {studyLocation.location}
        </p>
      </div>
      <div className="studyBlockBtn">
        {!userEmail || userEmail !== studyUserEmail ? (
          <button className="btnMediumPoint" onClick={() => handleParticipate(studyLocation.id)}>
            스터디참가
          </button>
        ) : (
          <button className="btnMediumPoint" onClick={() => handleStart(studyLocation.id)}>
            스터디시작
          </button>
        )}
      </div>
    </div>
  );
};

export default StudyBlock;
