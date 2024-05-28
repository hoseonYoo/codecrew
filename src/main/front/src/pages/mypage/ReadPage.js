import React from "react";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/MyReadPage.scss";
import { Link, useNavigate } from "react-router-dom";

const ReadPage = () => {
  const navigate = useNavigate();
  const moveToModify = () => {
    navigate("/mypage/modify");
  };

  return (
    <BasicLayoutPage headerTitle="마이페이지">
      <div>
        <div className="MyBlockWrap">
          <div className="MyReadImg"></div>
          <div className="MyReadTitle">
            <h3>김조은</h3>
            <p>kimjohn@naver.com</p>
          </div>
          <div className="MyReadBtn">
            <button className="btnMediumBlack" onClick={moveToModify}>
              정보수정
            </button>
          </div>
        </div>
        <div className="MyReadTextWrap">
          <div className="MyReadText">
            <h3>관심스택 : </h3>
            <div>
              <p>웹개발, 백엔드</p>
            </div>
          </div>
          <div className="MyReadText">
            <h3>링 크 : </h3>
            <p>www.github.io</p>
          </div>
          <div className="MyReadText">
            <h3>모임횟수 : </h3>
            <p>
              20<span>회</span>
            </p>
          </div>
        </div>
        <div className="MyReadUserText">
          <h2>사용자 소개</h2>
          <p>만나서 반가워요! 풀스택개발자를 희망하는 김 조 은 입니다!</p>
        </div>
      </div>
      <div className="MyReadUserMenu">
        <h2>나의 어플</h2>
        <div className="MenuWrap">
          <Link>
            <h3>📡 나의 알림</h3>
            <span>(9,999)</span>
          </Link>
        </div>
        <div className="MenuWrap">
          <Link>
            <h3>🧑🏻‍💻 나의 스터디</h3>
            <span>(9,999)</span>
          </Link>
        </div>
        <div className="MenuWrap">
          <Link>
            <h3>🏃🏻 참가 스터디</h3>
            <span>(9,999)</span>
          </Link>
        </div>
        <div className="MenuWrap">
          <Link>
            <h3>🔑 로그아웃</h3>
            <span></span>
          </Link>
        </div>
        <div className="MenuWrap">
          <Link>
            <h3>🗑️ 회원탈퇴</h3>
            <span>(고객정보가 모두 삭제됩니다.)</span>
          </Link>
        </div>
      </div>
    </BasicLayoutPage>
  );
};

export default ReadPage;
