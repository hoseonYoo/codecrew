import React, { useState } from "react";
import BasicLayoutLogin from "../layouts/BasicLayoutLogin";
import { Link } from "react-router-dom";
import "../scss/pages/loginPage.scss";
import useCustomLogin from "../hooks/useCustomLogin";
import { getKakaoLoginLink } from "../api/kakaoAPI";

// TODO: 로그인 테스트용 삭제예정
const initState = {
  email: "",
  password: 1111,
};
const LoginPage = () => {
  // TODO: 로그인 테스트용 삭제예정
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { execLogin, moveToPath } = useCustomLogin();

  // TODO: 로그인 테스트용 삭제예정
  const handleClickLogin = () => {
    execLogin(loginParam).then((data) => {
      console.log(data);
      if (data.error) {
        alert("이메일과 비밀번호를 다시 확인하세요!");
      } else {
        alert("로그인 성공!");
        moveToPath("/");
      }
    });
  };

  // TODO: 로그인 테스트용 삭제예정
  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const kakaoLoginLink = getKakaoLoginLink();

  return (
    <BasicLayoutLogin>
      <div className="loginWrap">
        <h2>🧑🏻‍💻 함께 성장할 크루를 모집해보세요</h2>
        <h3>코드크루는 IT 스터디모임 플랫폼입니다.</h3>
        {/*TODO: 로그인 테스트용 삭제예정*/}
        <input
          name="email"
          type="email"
          value={loginParam.email}
          onChange={handleChange}
        />
        {/*TODO: 로그인 테스트용 삭제예정*/}
        <button onClick={handleClickLogin}>
          <span>로그인</span>
        </button>

        <Link to={kakaoLoginLink}>
          <button>
            <img src="../assets/imgs/icon/ic_kakaoLogo.svg" alt="kakaologo" />
            <span>카카오톡으로 로그인</span>
          </button>
        </Link>
        <Link to="/">로그인하지 않고 둘러보기</Link>
      </div>
    </BasicLayoutLogin>
  );
};
export default LoginPage;
