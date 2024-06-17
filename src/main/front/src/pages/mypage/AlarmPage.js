import React, { useEffect, useState } from "react";
import "../../scss/pages/AlarmPage.scss";
import "../../scss/partials/NonePage.scss";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import AlarmBlock from "../../components/study/AlarmBlock";
import { useSelector } from "react-redux";
import { getNoticeList } from "../../api/noticeAPI";
import InfiniteScroll from "react-infinite-scroll-component";

const AlarmPage = () => {
  // 현재 로그인 된 회원의 이메일 가져오기
  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = loginState.email;
  const [refresh, setRefresh] = useState(false);
  const [noticeList, setNoticeList] = useState(null);
  const reRender = () => setRefresh(!refresh);

  // 페이지 로딩시 알림 목록 가져오기
  useEffect(() => {
    const loadInitialData = async () => {
      const data = await getNoticeList(userEmail);
      setNoticeList(data);
    };
    loadInitialData();
  }, [refresh]);

  return (
    <BasicLayoutPage headerTitle="알림">
      {noticeList === null || noticeList.length === 0 ? (
        <div className="nonePage">
          <img src="../assets/imgs/icon/ic_none.png" />
          <h2>도착한 알림이 없어요...</h2>
          <p>새로운 소식이 도착하면 알려드릴께요.</p>
        </div>
      ) : (
        <InfiniteScroll dataLength={noticeList.length} next={() => {}} hasMore={false} loader={<h4>Loading...</h4>}>
          {noticeList.map((notice, index) => (
            <AlarmBlock key={index} notice={notice} refresh={reRender} />
          ))}
        </InfiniteScroll>
      )}
      <div className="myFooter">
        <span>Copyright © 2024 Codecrew. All rights reserved.</span>
      </div>
    </BasicLayoutPage>
  );
};

export default AlarmPage;
