import React from "react";
import "../scss/partials/CategoryFilter.scss";

export default function CategoryFilter() {
  return (
    <div className="filterWrap">
      <div>
        <ul>
          <li>웹개발</li>
          <li>프론트엔드</li>
          <li>백엔드</li>
          <li>풀스텍</li>
          <li>모바일앱개발</li>
          <li>프로그래밍언어</li>
          <li>알고리즘</li>
          <li>데이터베이스</li>
          <li>데브옵스</li>
          <li>소프트웨어테스트</li>
          <li>퍼블리싱</li>
          <li>VR/AR</li>
          <li>자격증</li>
        </ul>
      </div>
    </div>
  );
}
