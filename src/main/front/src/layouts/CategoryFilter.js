import React, { useEffect, useState } from "react";
import "../scss/partials/CategoryFilter.scss";

export default function CategoryFilter() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="filterWrap">
      <div className="filterContainer">
        <ul>
          {/* <li className="activeFilter">전체</li>
          {categories.map((category, index) => (
            <li key={index}>{category.value}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}
