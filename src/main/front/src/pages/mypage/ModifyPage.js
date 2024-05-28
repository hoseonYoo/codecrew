import React, { useEffect, useState } from "react";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/MyModifyPage.scss";
import { useSelector } from "react-redux";
import { getMember, modifyMember } from "../../api/memberAPI";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  email: "",
  nickname: "",
  phone: 0,
  profileImg: "",
  memberLink: "",
  introduction: "",
  favoriteList: [],
};

const ModifyPage = () => {
  // 프로필 사진용
  const [imgSrc, setImgSrc] = useState(null);

  const [member, setMember] = useState(initState);
  const userEmail = useSelector((state) => state.loginSlice.email);
  const { exceptionHandle } = useCustomLogin();

  useEffect(() => {
    getMember(userEmail)
      .then((res) => {
        console.log("회원정보");
        console.log(res);
        setMember({ ...res });
      })
      .catch((err) => exceptionHandle(err));
  }, [userEmail]);

  //TODO 프로필 사진 수정기능 추가
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    }
  };
  const handleChange = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });
  };
  // TODO 관심스택 체크박스 기능 추가

  const handleClickModify = () => {
    modifyMember(member)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => exceptionHandle(err));
  };

  return (
    <BasicLayoutPage headerTitle="정보수정">
      <form>
        <div className="MyModifyWrap">
          <div
            className="MyModifyImg"
            style={{ backgroundImage: `url(${member.profileImg})` }}
          >
            <label htmlFor="fileInput">
              편집
              <input id="fileInput" type="file" onChange={handleFileChange} />
            </label>
          </div>
          <div>
            <h3>닉네임</h3>
            <input
              type="text"
              name="nickname"
              value={member.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          <div>
            <h3>관심스택</h3>
            <div className="checkboxWrap">
              <input id="check1" type="checkbox" />
              <label htmlFor="check1">웹개발</label>
              <input id="check2" type="checkbox" />
              <label htmlFor="check2">프론트엔드</label>
            </div>
          </div>
          <div>
            <h3>링크</h3>
            <input
              type="text"
              name="memberLink"
              value={member.memberLink}
              onChange={handleChange}
              placeholder="링크를 입력해주세요."
            />
          </div>
          <div>
            <h3>사용자 소개</h3>
            <textarea
              placeholder="사용자소개를 입력해주세요."
              name="introduction"
              value={member.introduction}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="MyModifyBtn">
            <button onClick={handleClickModify} className="btnLargePoint">
              저장
            </button>
          </div>
        </div>
      </form>
    </BasicLayoutPage>
  );
};

export default ModifyPage;
