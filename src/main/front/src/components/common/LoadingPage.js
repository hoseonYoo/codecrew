import React from "react";

const LoadingPage = () => {
  return (
    <div>
      <h4>로딩 중..</h4>
      {/*TODO 로딩 이미지 변경 */}
      <img
        src={process.env.PUBLIC_URL + "/assets/images/spinner.svg"}
        alt="loading"
      />
    </div>
  );
};
export default LoadingPage;
