import React, { useEffect, useState } from "react";
import axios from "axios";
import "../scss/partials/CategoryFilter.scss";
import { API_SERVER_HOST } from "../api/memberAPI";
const prefix = `${API_SERVER_HOST}/api/categories`;

export default function CategoryFilterList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(prefix)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.log("Data is not an array!");
        }
      })
      .catch((error) => {
        console.log("There was an error fetching the categories.");
      });
  }, []);

  return (
    <div className="filterWrap">
      <div className="filterContainer">
        <ul>
          <li className="activeFilter">전체</li>
          {categories.length > 0 && categories.map((category, index) => <li key={index}>{category}</li>)}
        </ul>
      </div>
    </div>
  );
}
