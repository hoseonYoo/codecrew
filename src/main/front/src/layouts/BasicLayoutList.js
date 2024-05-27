import React from "react";
import HeaderList from "./HeaderList";

const BasicLayoutSearch = ({ children }) => {
  return (
    <>
      <div className="bodyWrap">
        <HeaderList />
        <div className="contentWrap">{children}</div>
      </div>
    </>
  );
};

export default BasicLayoutSearch;
