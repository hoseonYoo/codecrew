import React from "react";
import { Outlet } from "react-router-dom";

const StudyIndex = ({ headerTitle }) => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default StudyIndex;
