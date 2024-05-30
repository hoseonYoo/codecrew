import React, { useState } from "react";
import "../../scss/pages/AlarmPage.scss";
import "../../scss/partials/NonePage.scss";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import AlarmBlock from "../../components/study/AlarmBlock";

const AlarmPage = () => {
  // 버튼의 표시 상태를 관리하는 상태 변수
  const [isEditing, setIsEditing] = useState(false);

  // '편집' 버튼 클릭 이벤트 핸들러
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // '완료' 버튼 클릭 이벤트 핸들러
  const handleCompleteClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <BasicLayoutPage headerTitle="알림">
        {/* '편집' 버튼은 isEditing이 false일 때만 표시 */}
        {!isEditing && (
          <button id="ActiveBtn" className="btnSmallPoint alSetBtn" onClick={handleEditClick}>
            편집
          </button>
        )}

        {/* '완료' 버튼은 isEditing이 true일 때만 표시 */}
        {isEditing && (
          <button id="ASetBtn" className="btnSmallPoint alSetBtn" onClick={handleCompleteClick}>
            완료
          </button>
        )}

        {/* 컨텐츠 없을 경우 */}
        {/* <div className="nonePage">
        <img src="../assets/imgs/icon/ic_none.png" />
        <h2>아직 도착한 알림이 없어요</h2>
        <p>새로운 소식이 도착하면 알려드릴께요.</p>
      </div> */}
        <div>
          <AlarmBlock isEditing={isEditing} />
        </div>
      </BasicLayoutPage>
    </>
  );
};

export default AlarmPage;
