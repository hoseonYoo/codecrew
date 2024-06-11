import React, { useState } from "react";

const CoMarkPopup = () => {
  // 팝업 표시 상태를 관리하는 state
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  // 팝업을 숨기는 함수
  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      {isPopupVisible && (
        <div className="CoMarkWrap" onClick={hidePopup}>
          <div className="CoMarkContent">
            {/* 클릭 시 hidePopup 함수를 호출하여 팝업을 숨김 */}
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
