import React, { useState, useEffect } from "react";
import axios from "axios";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/AddPage.scss";
import { API_SERVER_HOST } from "../../api/memberAPI";
import DaumPostcode from "react-daum-postcode";
const prefix = `${API_SERVER_HOST}/api/categories`;

const AddPage = () => {
  //주소입력 모달
  const [modalState, setModalState] = useState(false);
  const [inputAddressValue, setInputAddressValue] = useState("");

  const handleAddressSearchClick = () => {
    setModalState(true); // 모달을 표시하도록 상태 변경
  };

  const onCompletePost = (data) => {
    setModalState(false); // 모달을 숨기도록 상태 변경
    setInputAddressValue(data.address); // 주소 값을 설정
  };

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
    <>
      {/* 모달창입니다. */}
      {modalState && (
        <div style={{ position: "fixed", zIndex: "99999", width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div style={{ width: "100vw", maxWidth: "400px", minWidth: "320px", margin: "0 auto", marginTop: "20vh" }}>
            <DaumPostcode onComplete={onCompletePost} />
          </div>
        </div>
      )}
      {/* 모달창입니다. */}
      <BasicLayoutPage headerTitle="스터디추가">
        <form>
          <div className="StudyAddWrap">
            <div className="StudyAddImg" style={{ backgroundImage: `url(${imgSrc})` }}>
              <label htmlFor="fileInput">
                추가
                <input id="fileInput" type="file" onChange={handleFileChange} />
              </label>
            </div>
            <div>
              <h3>스터디명</h3>
              <input type="text" placeholder="스터디명을 입력해주세요." />
            </div>
            <div>
              <h3>연락처</h3>
              <input type="text" placeholder="연락처를 입력해주세요." />
            </div>
            <div>
              <h3>주소</h3>
              <input type="text" value={inputAddressValue} placeholder="주소를 입력해주세요." readOnly />
              <img className="AdressSearch" src="../assets/imgs/icon/ic_serch_gr.svg" alt="searchIcon" onClick={handleAddressSearchClick} />
            </div>
            <div>
              <h3>참여일자</h3>
              <input type="datetime-local" placeholder="연락처를 입력해주세요." />
            </div>
            <div>
              <h3>참여인원</h3>
              <select>
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3>카테고리</h3>
              <select>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3>스터디 소개</h3>
              <textarea placeholder="스터디소개를 입력해주세요."></textarea>
            </div>
          </div>
          <div className="bottomBtnWrap">
            <button className="btnLargePoint">스터디추가</button>
          </div>
        </form>
      </BasicLayoutPage>
    </>
  );
};

export default AddPage;
