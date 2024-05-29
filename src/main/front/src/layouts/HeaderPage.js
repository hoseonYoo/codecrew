import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/partials/header.scss";

export default function HeaderPage({ headerTitle }) {
  const navigate = useNavigate();
  // console.log(headerTitle);

  // 뒤로가기 버튼
  const onclickBtn = () => {
    navigate(-1);
  };

  return (
    <header>
      <div className="headerWrap">
        {/* 검색페이지 헤더 */}
        <div className="headerBackContnent">
          <div onClick={onclickBtn}>
            <img
              src="../assets/imgs/icon/ic_ar_bk.svg"
              alt="backBtn"
              height="36px"
            />
          </div>
        </div>
        <div className="headerTitleContent">
          {/* 처리 */}
          <p>{headerTitle}</p>
        </div>
      </div>
    </header>
  );
}
