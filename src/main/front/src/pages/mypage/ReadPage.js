import React, { useEffect, useState } from "react";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/MyReadPage.scss";
import { Link } from "react-router-dom";
import { API_SERVER_HOST, getMember } from "../../api/memberAPI";
import useCustomMove from "../../hooks/useCustomMove";
import { useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import axios from "axios";

const initState = {
  email: "",
  nickname: "",
  phone: 0,
  profileImg: "",
  memberLink: "",
  introduction: "",
  favoriteList: [],
  noticeList: [],
  penalty: 0,
  blockedDate: "",
};

const host = API_SERVER_HOST;

const ReadPage = () => {
  const { moveToModify } = useCustomMove();

  const [member, setMember] = useState(initState);
  const userEmail = useSelector((state) => state.loginSlice.email);
  const [categories, setCategories] = useState({});
  const { exceptionHandle } = useCustomLogin();
  const { execLogout, moveToPath } = useCustomLogin();
  const [imgSrc, setImgSrc] = useState("");

  const handleClickLogout = () => {
    execLogout();
    moveToPath("/");
  };

  useEffect(() => {
    getMember(userEmail)
      .then((res) => {
        // 초기 로딩시 카카오 프로필인지 여부 체크
        if (res.profileImg === "") {
        } else if (res.profileImg.startsWith("http")) {
          console.log("카카오 프로필");
          setImgSrc(res.profileImg);
        } else {
          console.log("일반 프로필");
          setImgSrc(`${host}/api/image/view/${res.profileImg}`);
        }
        setMember({ ...res });
      })
      .catch((err) => exceptionHandle(err));
  }, [userEmail]);

  useEffect(() => {
    axios
      .get(`${host}/api/categories`)
      .then((response) => {
        console.log(response.data);

        setCategories({ ...response.data });
        console.log(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BasicLayoutPage headerTitle="마이페이지">
      <div>
        <div className="MyBlockWrap">
          <div
            className="MyReadImg"
            style={imgSrc !== "" ? { backgroundImage: `url(${imgSrc})` } : null}
          ></div>
          <div className="MyReadTitle">
            <h3>{member.nickname}</h3>
            <p>{member.email}</p>
          </div>
          <div className="MyReadBtn">
            <button className="btnMediumBlack" onClick={moveToModify}>
              정보수정
            </button>
          </div>
        </div>
        {/*TODO 관심스택 마진 변경 필요*/}
        <div className="MyReadTextWrap">
          <div className="MyReadText">
            <h3>관심스택 : </h3>
            <div>
              {Object.entries(categories).length > 0 &&
                Object.entries(categories).map(([key, value], index) => (
                  <React.Fragment key={index}>
                    {member.favoriteList.includes(key) ? (
                      <span>{value} </span>
                    ) : null}
                  </React.Fragment>
                ))}
            </div>
          </div>
          <div className="MyReadText">
            <h3>링 크 : </h3>
            {member.memberLink ? (
              <p>{member.memberLink}</p>
            ) : (
              <p>등록한 링크가 없습니다.</p>
            )}
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
          {member.introduction ? (
            <p>{member.introduction}</p>
          ) : (
            <p>사용자 소개가 없습니다.</p>
          )}
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
        <div onClick={handleClickLogout} className="MenuWrap">
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
