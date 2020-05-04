import React, { useState, useEffect } from "react";
import { fetchCountries } from "../../api";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import styles from "./CountryPicker.module.css";
import cx from "classnames";

const CountryPicker = ({ countries, handleCountryChange }) => {
  useEffect(() => {
    const selects = document.querySelectorAll("select");
    M.FormSelect.init(selects, {});
  });
  if (!countries[0]) return <div></div>;
  return (
    <div className="container">
      <span className={styles.countrySpan}>Select a Country</span>
      <div className="input-field col s12">
        <select
          style={{ color: "white" }}
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="">Global</option>
          {countries.map((country, i) => (
            <option
              style={{ fontFamily: "Oswald, sans-serif" }}
              className="black-text"
              value={country}
              key={i}
            >
              {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CountryPicker;
