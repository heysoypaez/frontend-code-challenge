import React from "react";
import config from "../config";
const { NOT_RESULTS_URL } = config;

const NotResults = () => (
  <li>
    <img src={NOT_RESULTS_URL} alt="" />
    <div className="info">
      <h1 className="no-results">No results</h1>
    </div>
  </li>
);

export default NotResults;
