import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/MyModifyPage.scss";
import { useSelector } from "react-redux";
import { API_SERVER_HOST, getMember, modifyMember } from "../../api/memberAPI";
import useCustomLogin from "../../hooks/useCustomLogin";
import { uploadImage } from "../../api/imageAPI";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  email: "",
  nickname: "",
  phone: 0,
  profileImg: "",
  memberLink: "",
  introduction: "",
  favoriteList: [],
};
const host = API_SERVER_HOST;

const ModifyPage = () => {
  // 프로필 사진용
  const [imgSrc, setImgSrc] = useState("");
  const { moveToMypage } = useCustomMove();

  const [member, setMember] = useState(initState);
  const userEmail = useSelector((state) => state.loginSlice.email);
  const { exceptionHandle } = useCustomLogin();
  const [categories, setCategories] = useState({});

  const uploadRef = useRef();

  useEffect(() => {
    getMember(userEmail)
      .then((res) => {
        console.log("회원정보");
        console.log(res);
        setMember({ ...res });
        // 초기 로딩시 카카오 프로필인지 여부 체크
        if (res.profileImg === "") {
          console.log("프로필 없음");
          setImgSrc("../../../public/assets/imgs/icon/default_profile_img.png)");
        } else if (res.profileImg.startsWith("http")) {
          console.log("카카오 프로필");
          setImgSrc(res.profileImg);
        } else {
          console.log("일반 프로필");
          setImgSrc(`${host}/api/image/view/${res.profileImg}`);
        }
      })
      .catch((err) => exceptionHandle(err));
  }, [userEmail]);

  //TODO 프로필 사진 중복 저장 문제 해결 필요
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    }
    const uploadfile = uploadRef.current.files[0];
    const formData = new FormData();
    let profileImg = member.profileImg;
    formData.append("file", file);

    uploadImage(formData)
      .then((res) => {
        console.log("이미지 업로드 성공");
        console.log(res);
        profileImg = res;
      })
      .then(() => {
        // member에 파일이름 넣어주기
        let newMember = { ...member };
        newMember.profileImg = profileImg;
        setMember(newMember);
      });
  };
  const handleChange = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });
  };
  // TODO 관심스택 체크박스 기능 추가
  const handleCheckChange = (e) => {
    console.log(member.favoriteList);
    let newFavorite = [...member.favoriteList];
    if (newFavorite.includes(e.target.id)) {
      newFavorite = newFavorite.filter((item) => item !== e.target.id);
    } else {
      newFavorite.push(e.target.id);
    }
    member.favoriteList = newFavorite;
    setMember({ ...member });
  };

  const handleClickModify = () => {
    // TODO member에 uploadRef 넣어줘야함

    console.log(member);

    modifyMember(member)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => exceptionHandle(err));
    moveToMypage();
  };

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
    <BasicLayoutPage headerTitle="정보수정">
      <form>
        <div className="MyModifyWrap">
          <div className="MyModifyImg" style={member.profileImg !== "" ? { backgroundImage: `url(${member.profileImg})` } : null}>
            <label htmlFor="fileInput">
              편집
              <input id="fileInput" ref={uploadRef} type="file" onChange={handleFileChange} />
            </label>
          </div>
          <div>
            <h3>닉네임</h3>
            <input type="text" name="nickname" value={member.nickname} onChange={handleChange} placeholder="닉네임을 입력해주세요." />
          </div>
          <div>
            <h3>관심스택</h3>
            <div className="checkboxWrap">
              {Object.entries(categories).length > 0 &&
                Object.entries(categories).map(([key, value], index) => (
                  <React.Fragment key={index}>
                    <input onChange={handleCheckChange} id={key} type="checkbox" checked={member.favoriteList.includes(key)} />
                    <label htmlFor={key}>{value}</label>
                  </React.Fragment>
                ))}
            </div>
          </div>
          <div>
            <h3>연락처</h3>
            <input type="text" placeholder="전화번호를 입력해주세요." />
          </div>
          <div>
            <h3>링크</h3>
            <input type="text" name="memberLink" value={member.memberLink} onChange={handleChange} placeholder="링크를 입력해주세요." />
          </div>
          <div>
            <h3>사용자 소개</h3>
            <textarea placeholder="사용자소개를 입력해주세요." name="introduction" value={member.introduction} onChange={handleChange}></textarea>
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
