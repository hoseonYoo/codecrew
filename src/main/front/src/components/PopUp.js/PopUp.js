import React, { useState } from "react";
import "../../scss/partials/PopUp.scss";

// 스터디 참가
const PopUpJOIN = () => {
  return (
    <>
      <div className="newPopupWrap">
        <div className="newPopupContent">
          <h2>🧑🏻‍💻 스터디 참가</h2>
          <p>스터디에 참가하시겠습니까?</p>
          <div className="newPopupBtnWrap">
            <button className="btnMediumPoint">예</button>
            <button className="btnMediumPointLine">아니오</button>
          </div>
        </div>
      </div>
    </>
  );
};

// 전화연결
const PopUpCall = ({ study, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  const handleContactClick = () => {
    if (study.memberPhone) {
      setShowModal(true);
    } else {
      alert("크루가 연락처를 공개하지 않았습니다.");
    }
  };

  const confirmCall = () => {
    window.location.href = `tel:${study.memberPhone}`;
  };

  return (
    <>
      <button className="btnSmallPoint" onClick={handleContactClick}>
        연락하기
      </button>
      {showModal && (
        <div className="newPopupWrap">
          <div className="newPopupContent">
            <h2>🧑🏻‍💻 연락하기</h2>
            <p>스터디장에게 전화가 연결됩니다.</p>
            <div className="newPopupBtnWrap">
              <button className="btnMediumPoint" onClick={confirmCall}>
                예
              </button>
              <button className="btnMediumPointLine" onClick={onClose}>
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { PopUpJOIN, PopUpCall };
