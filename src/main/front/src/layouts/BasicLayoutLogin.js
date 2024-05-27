import React from "react";
import HeaderLogin from "./HeaderLogin";

const BasicLayoutLogin = ({ children }) => {
  return (
    <>
      <div className="bodyWrap">
        <HeaderLogin />
        <div className="contentWrap">{children}</div>
      </div>
    </>
  );
};

export default BasicLayoutLogin;
