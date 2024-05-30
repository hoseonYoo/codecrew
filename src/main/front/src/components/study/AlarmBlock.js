import React from "react";
import "../../scss/partials/AlarmBlock.scss";
const AlarmBlock = ({ isEditing }) => {
  return (
    // 이동 추가
    <div className="AlBlockWrap">
      <div className="AlBlockImg"></div>
      <div className="AlBlockTitle">
        <h3>스터디장소에 도착했습니다.</h3>
        <p>2024.05.30</p>
      </div>
      <div className={`AlBlockBtn ${isEditing ? "delActive" : ""}`}>
        <button>
          <img src="/assets/imgs/icon/ic_del.png" alt="Delete" />
        </button>
      </div>
    </div>
  );
};
export default AlarmBlock;
