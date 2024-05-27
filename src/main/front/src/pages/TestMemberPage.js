import React, { useEffect } from "react";
import { testGet } from "../api/testAPI";
import useCustomLogin from "../hooks/useCustomLogin";

const TestMemberPage = () => {
  const { exceptionHandle } = useCustomLogin();
  useEffect(() => {
    console.log("TestMemberPage");
    testGet()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        exceptionHandle(err);
      });
  }, []);
  return <div>TestMemberPage</div>;
};
export default TestMemberPage;
