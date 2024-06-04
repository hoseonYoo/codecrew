import React, { useEffect, useState } from "react";
import BasicLayoutList from "../../layouts/BasicLayoutList";
import "../../scss/pages/listPage.scss";
import StudyBlock from "../../components/study/StudyBlock";
import { useSelector, useDispatch } from "react-redux";
import { setMyLocation } from "../../slices/categorySlice";

const ListPage = () => {
  // 셀렉터로 카테고리 필터링 데이터 가져오기
  const studyLocationList = useSelector(
    (state) => state.categorySlice.studyLocationList,
  );
  const myLocation = useSelector((state) => state.categorySlice.myLocation);
  const dispatch = useDispatch();
  // 내 위치 가져오기
  useEffect(() => {
    dispatch(setMyLocation());
  }, []);

  // 현위치 가져오면 데이터 정렬하기

  useEffect(() => {}, [studyLocationList]);
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
