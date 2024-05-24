import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <h1>MainPage</h1>
      <div>
        <Link to={"/login"}>login</Link>
      </div>
      <div>
        <Link to={"/testMember"}>member</Link>
        <span>test</span>
      </div>
    </div>
  );
};
export default MainPage;
