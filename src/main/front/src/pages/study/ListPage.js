import React from "react";
import BasicLayoutList from "../../layouts/BasicLayoutList";
import "../../scss/pages/listPage.scss";
import StudyBlock from "../../components/study/StudyBlock";

const ListPage = () => {
  return (
    <BasicLayoutList>
      <div className="listContentWrap">
        {/* StudyBlock for문으로 추가 */}
        <StudyBlock />
      </div>
    </BasicLayoutList>
  );
};

export default ListPage;
