import React, { useEffect, useState } from "react";
import axios from "axios";
import "../scss/partials/CategoryFilter.scss";
import { API_SERVER_HOST } from "../api/memberAPI";

const host = API_SERVER_HOST;

export default function CategoryFilter() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${host}/api/categories`)
      .then((response) => {
        console.log(response.data);

        setCategories({ ...response.data });
        console.log(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="filterWrap">
      <div className="filterContainer">
        <ul>
          <li className="activeFilter">전체</li>
          {Object.entries(categories).length > 0 &&
            Object.entries(categories).map(([key, value], index) => (
              <React.Fragment key={index}>
                <li>{value}</li>
              </React.Fragment>
            ))}
        </ul>
      </div>
    </div>
  );
}
