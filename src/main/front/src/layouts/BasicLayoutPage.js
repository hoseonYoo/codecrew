import React from "react";
import HeaderPage from "./HeaderPage";

const BasicLayoutPage = ({ children, headerTitle }) => {
  console.log(headerTitle);
  return (
    <>
      <div className="bodyWrap">
        <HeaderPage headerTitle={headerTitle} />
        <div className="contentWrap">{children}</div>
      </div>
    </>
  );
};

export default BasicLayoutPage;
