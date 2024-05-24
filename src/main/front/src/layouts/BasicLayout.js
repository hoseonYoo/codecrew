import React from "react";
import Header from "./Header";

const BasicLayout = ({ children }) => {
  return (
    <>
      <div className="bodyWrap">
        <Header />
        <div>{children}</div>
      </div>
    </>
  );
};

export default BasicLayout;
