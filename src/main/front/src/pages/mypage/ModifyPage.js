import React, { useState, useEffect } from "react";
import axios from "axios";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/MyModifyPage.scss";
import { API_SERVER_HOST } from "../../api/memberAPI";
const prefix = `${API_SERVER_HOST}/api/categories`;

const ModifyPage = () => {
  const [imgSrc, setImgSrc] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(prefix)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.log("Data is not an array!");
        }
      })
      .catch((error) => {
        console.log("There was an error fetching the categories.");
      });
  }, []);

  return (
    <BasicLayoutPage headerTitle="정보수정">
      <form>
        <div className="MyModifyWrap">
          <div className="MyModifyImg" style={{ backgroundImage: `url(${imgSrc || "../../../public/assets/imgs/icon/default_profile_img.png"})` }}>
            <label htmlFor="fileInput">
              편집
              <input id="fileInput" type="file" onChange={handleFileChange} />
            </label>
          </div>
          <div>
            <h3>닉네임</h3>
            <input type="text" placeholder="닉네임을 입력해주세요." />
          </div>
          <div>
            <h3>관심스택</h3>
            <div className="checkboxWrap">
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <>
                    <input key={index} id={category} type="checkbox" />
                    <label htmlFor={category}>{category}</label>
                  </>
                ))}
              {/* <input id="check1" type="checkbox" />
              <label htmlFor="check1">웹개발</label>
              <input id="check2" type="checkbox" />
              <label htmlFor="check2">프론트엔드</label> */}
            </div>
          </div>
          <div>
            <h3>연락처</h3>
            <input type="text" placeholder="전화번호를 입력해주세요." />
          </div>
          <div>
            <h3>링크</h3>
            <input type="text" placeholder="링크를 입력해주세요." />
          </div>
          <div>
            <h3>사용자 소개</h3>
            <textarea placeholder="사용자소개를 입력해주세요."></textarea>
          </div>
          <div className="MyModifyBtn">
            <button className="btnLargePoint">저장</button>
          </div>
        </div>
      </form>
    </BasicLayoutPage>
  );
};

export default ModifyPage;
