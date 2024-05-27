import React from "react";
import HeaderSearch from "./HeaderSearch";

const BasicLayoutSearch = ({ children }) => {
  return (
    <>
      <div className="bodyWrap">
        <HeaderSearch />
        <div className="contentWrap">{children}</div>
      </div>
    </>
  );
};

export default BasicLayoutSearch;
