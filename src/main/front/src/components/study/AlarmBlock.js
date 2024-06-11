import React from "react";
import "../../scss/partials/AlarmBlock.scss";
const AlarmBlock = () => {
  return (
    // 이동 추가
    <div className="AlBlockWrap">
      <div className="AlBlockImg"></div>
      <div className="AlBlockTitle">
        <h3>블랙회원으로 강등되었습니다… 3일간 스터디를 생성하거나 참석할 수 없습니다.</h3>
        <p>2024.05.30</p>
      </div>
      <div className="AlBlockBtn">
        <button>
          <img src="/assets/imgs/icon/ic_del.png" alt="Delete" />
        </button>
      </div>
    </div>
  );
};
export default AlarmBlock;
