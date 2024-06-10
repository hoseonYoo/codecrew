import React from "react";
import "../../scss/pages/MyReadPage.scss";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import useMemberProfile from "../../hooks/useMemberProfile";
import { API_SERVER_HOST } from "../../api/studyAPI";
import useCategories from "../../hooks/useCategories";
import { useParams } from "react-router-dom";

const host = API_SERVER_HOST;

const ProfilePage = () => {
  const { email } = useParams();
  // 수정이 필요없는 조회용 회원 정보 가져오기
  const { member, imgSrc } = useMemberProfile(email);
  // 전체 관심스택 가져오기
  const categories = useCategories(host);

  return (
    <BasicLayoutPage headerTitle="프로필">
      <div>
        <div className="MyBlockWrap">
          <div className="MyReadImg" style={imgSrc !== "" ? { backgroundImage: `url(${imgSrc})` } : null}></div>
          <div className="MyReadTitle">
            <h3>{member.nickname}</h3>
            <p>{member.email}</p>
          </div>
          <div className="MyReadBtn"></div>
        </div>
        {/*TODO 관심스택 마진 변경 필요*/}
        <div className="MyReadTextWrap">
          <div className="MyReadText">
            <h3>관심스택 : </h3>
            <div>
              {Object.entries(categories).length > 0 &&
                Object.entries(categories).map(([key, value], index) => <React.Fragment key={index}>{member.favoriteList.includes(key) ? <span>{value} </span> : null}</React.Fragment>)}
            </div>
          </div>
          <div className="MyReadText">
            <h3>링 크 : </h3>
            {member.memberLink ? <p>{member.memberLink}</p> : <p>등록한 링크가 없습니다.</p>}
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
          {member.introduction ? <p>{member.introduction}</p> : <p>사용자 소개가 없습니다.</p>}
        </div>
      </div>
    </BasicLayoutPage>
  );
};

export default ProfilePage;
