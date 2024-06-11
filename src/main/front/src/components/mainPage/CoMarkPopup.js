import React, { useState, useEffect } from "react";

const CoMarkPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 'visited' 상태를 확인
    const hasVisited = localStorage.getItem("visited");

    if (!hasVisited) {
      // 사용자가 처음 방문했다면, 팝업을 표시하고 'visited' 상태를 true로 설정
      setIsPopupVisible(true);
      localStorage.setItem("visited", "true");
    }
  }, []);

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      {isPopupVisible && (
        <div className="CoMarkWrap" onClick={hidePopup}>
          <div className="CoMarkContent">
            <img src="/assets/imgs/icon/ccmark_close.svg" onClick={hidePopup} />
          </div>
          <div className="CoMarkContent">
            <img src="/assets/imgs/icon/ccmark01.png" />
          </div>
          <div className="CoMarkContent">
            <img src="/assets/imgs/icon/ccmark02.png" />
          </div>
          <div className="CoMarkContent">
            <img src="/assets/imgs/icon/ccmark03.png" />
          </div>
        </div>
      )}
    </>
  );
};

export default CoMarkPopup;
