import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { postAdd } from "../../api/studyAPI";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/AddPage.scss";
import { API_SERVER_HOST } from "../../api/memberAPI";
import DaumPostcode from "react-daum-postcode";
import { uploadImage } from "../../api/imageAPI";
const { kakao } = window;

const host = API_SERVER_HOST;

// 스터디 저장값 초기화
const initState = {
  thImg: "",
  title: "",
  content: "",
  memberEmail: "",
  location: "",
  studyDate: "",
  maxPeople: 1,
  category: "",
};
// 유즈 셀렉트
const AddPage = () => {
  //주소입력 모달
  const [modalState, setModalState] = useState(false);
  const [study, setStudy] = useState(initState);
  const [inputAddressValue, setInputAddressValue] = useState("");
  const [categories, setCategories] = useState({});
  const uploadRef = useRef();
  const userEmail = useSelector((state) => state.loginSlice.email);

  const handleAddressSearchClick = () => {
    setModalState(true); // 모달을 표시하도록 상태 변경
  };

  const onCompletePost = (data) => {
    setModalState(false); // 모달을 숨기도록 상태 변경
    setInputAddressValue(data.address); // 주소 값을 설정

    // study 객체의 location 필드를 업데이트합니다.
    setStudy((prevStudy) => ({
      ...prevStudy,
      location: data.address,
    }));
  };

  // 이미지 관련
  const [imgSrc, setImgSrc] = useState(null);
  // 이미지 업로드시 배경 변경
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    }
    const uploadfile = uploadRef.current.files[0];
    const formData = new FormData();
    let thImg = study.thImg;
    formData.append("file", file);

    uploadImage(formData)
      .then((res) => {
        console.log("이미지 업로드 성공");
        console.log(res);
        thImg = res;
      })
      .then(() => {
        // member에 파일이름 넣어주기
        let newStudy = { ...study };
        newStudy.thImg = thImg;
        setStudy(newStudy);
      });
  };

  // 입력관련 방지
  const characterCheck = (e) => {
    const regExp = /[ \{\}\[\]\/?,;:|\)*~`\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
    // 입력된 값이 숫자, 백스페이스, 삭제 키가 아니면 입력을 막습니다.
    // if (!/^[0-9]*$/.test(e.key) && e.type === "keydown" && e.key !== "Backspace" && e.key !== "Delete") {
    //   e.preventDefault();
    // }
    if (regExp.test(e.target.value)) {
      alert("특수문자는 입력하실수 없습니다.");
      e.target.value = e.target.value.substring(0, e.target.value.length - 1); // 입력한 특수문자 한자리 지움
    }
  };

  const handleChangeStudy = (e) => {
    study[e.target.name] = e.target.value;
    setStudy({ ...study });
    console.log(study);
  };

  const handleChangeLocation = () => {
    let location = study.location;

    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(location, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        study.locationX = result[0].x;
        study.locationY = result[0].y;
        setStudy({ ...study });
        console.log(study);
      }
    });
  };

  //버튼
  const handleClickAdd = (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 방지합니다.

    // 확인 처리
    if (study.thImg === "") {
      alert("이미지가 등록되지 않았습니다.");
      return; // 함수 실행을 여기서 중단합니다.
    }
    if (study.title === "") {
      alert("제목이 입력되지 않았습니다.");
      return; // 함수 실행을 여기서 중단합니다.
    }
    if (study.location === "") {
      alert("위치정보가 입력되지 않았습니다.");
      return; // 함수 실행을 여기서 중단합니다.
    }
    if (study.studyDate === "") {
      alert("참여날짜가 입력되지 않았습니다.");
      return; // 함수 실행을 여기서 중단합니다.
    }
    // 참여 날짜가 현재시간으로 부터 24시간이후 보다 전이면 중단
    if (new Date(study.studyDate).getTime() < new Date().getTime() + 86400000) {
      alert("참여날짜는 현재시간으로부터 24시간 이후로 설정해주세요.");
      return;
    }
    if (study.category === "카테고리 선택" || study.category === "") {
      alert("카테고리가 입력되지 않았습니다.");
      return; // 함수 실행을 여기서 중단합니다.
    }
    if (study.content === "") {
      alert("소개글이 입력되지 않았습니다.");
      return; // 함수 실행을 여기서 중단합니다.
    }

    handleChangeLocation();

    const formData = new FormData();
    formData.append("thImg", study.thImg);
    formData.append("title", study.title);
    formData.append("content", study.content);
    formData.append("memberEmail", userEmail);
    formData.append("location", study.location);
    formData.append("strStudyDate", study.studyDate);
    formData.append("maxPeople", parseInt(study.maxPeople));
    formData.append("category", study.category);
    formData.append("locationX", study.locationX);
    formData.append("locationY", study.locationY);
    console.log(formData);

    // 여기에 서버로 데이터를 전송하는 코드를 추가합니다.
    postAdd(formData).then((data) => {
      console.log("postAdd result : ", data);
      alert("저장완료");
    });
  };

  //카테고리 불러오기
  useEffect(() => {
    axios
      .get(`${host}/api/categories`)
      .then((response) => {
        setCategories({ ...response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* 모달창입니다. */}
      {modalState && (
        <div
          style={{
            position: "fixed",
            zIndex: "99999",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              width: "100vw",
              maxWidth: "400px",
              minWidth: "320px",
              margin: "0 auto",
              marginTop: "20vh",
            }}
          >
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
                <input id="fileInput" ref={uploadRef} type="file" onChange={handleFileChange} />
              </label>
            </div>
            <div>
              <h3>스터디명</h3>
              <input name="title" value={study.title} type="text" placeholder="스터디명을 입력해주세요." onKeyUp={characterCheck} onKeyDown={characterCheck} onChange={handleChangeStudy} />
            </div>
            <div onClick={handleAddressSearchClick}>
              <h3>주소</h3>
              <input name="location" type="text" value={study.location} placeholder="주소를 입력해주세요." readOnly />

              <img className="AdressSearch" src="../assets/imgs/icon/ic_serch_gr.svg" alt="searchIcon" />
            </div>
            <div>
              <h3>참여날짜</h3>
              <input
                name="studyDate"
                value={study.studyDate}
                type="datetime-local"
                placeholder="참여일을 입력해주세요."
                onChange={handleChangeStudy}
                min={new Date().toISOString().substring(0, 16)}
                max={new Date(new Date().getTime() + 12096e5).toISOString().substring(0, 16)}
              />
            </div>
            <div>
              <h3>참여인원</h3>
              <select name="maxPeople" value={study.maxPeople} onChange={handleChangeStudy}>
                {Array.from({ length: 9 }, (_, index) => (
                  <option key={index} value={index + 2}>
                    {index + 2}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3>카테고리</h3>
              <select name="category" value={study.category} onChange={handleChangeStudy}>
                <option hidden>카테고리 선택</option>
                {Object.entries(categories).length > 0 &&
                  Object.entries(categories).map(([key, value], index) => (
                    <React.Fragment key={index}>
                      <option id={key} value={key}>
                        {value}
                      </option>
                    </React.Fragment>
                  ))}
              </select>
            </div>
            <div>
              <h3>스터디 소개</h3>
              <textarea name="content" value={study.content} placeholder="스터디소개를 입력해주세요." onChange={handleChangeStudy} onKeyUp={characterCheck} onKeyDown={characterCheck}></textarea>
            </div>
          </div>
          <div className="bottomBtnWrap">
            <button onClick={handleClickAdd} className="btnLargePoint">
              스터디추가
            </button>
          </div>
        </form>
      </BasicLayoutPage>
    </>
  );
};

export default AddPage;
