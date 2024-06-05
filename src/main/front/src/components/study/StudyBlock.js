import React from "react";
import "../../scss/partials/StudyBlock.scss";
import { API_SERVER_HOST } from "../../api/memberAPI";
import useCustomMove from "../../hooks/useCustomMove";
const StudyBlock = ({ studyLocation }) => {
  const host = API_SERVER_HOST;
  const { moveToReadPage } = useCustomMove();
  return (
    // 이동 추가
    <div className="studyBlockWrap">
      <div
        className="studyBlockImg"
        style={
          studyLocation.thImg.startsWith("http:")
            ? { backgroundImage: `url(${studyLocation.thImg})` }
            : {
                backgroundImage: `url(${host}/api/image/view/${studyLocation.thImg})`,
              }
        }
      ></div>
      <div className="studyBlockTitle">
        <h3
          onClick={() => {
            moveToReadPage(studyLocation.id);
          }}
        >
          {studyLocation.title}
        </h3>
        <p>{studyLocation.location}</p>
      </div>
      <div className="studyBlockBtn">
        <button className="btnMediumPoint">스터디참가</button>
      </div>
    </div>
  );
};
export default StudyBlock;
