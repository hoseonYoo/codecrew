import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../scss/partials/CategoryFilter.scss";
import { fetchCategories } from "../slices/CategorySlice";

export default function CategoryFilterList() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  console.log(categories);

  return (
    <div className="filterWrap filterWrapListBack">
      <div className="filterContainer">
        <ul className="ListBackUl">
          {/* <li className="activeFilter">전체</li>
          {categories.map((category, index) => (
            <li key={index}>{category.value}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}
