import React from "react";
import BasicLayoutPage from "../../layouts/BasicLayoutPage";
import "../../scss/pages/mainPage.scss";
import { Outlet } from "react-router-dom";

const MypageIndex = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};
export default MypageIndex;
