import React, { useEffect, useState, Fragment } from "react";
import { Cards, Charts, CountryPicker } from "./components";
import { fetchData, fetchCountries } from "./api";
import styles from "./App.module.css";
import cx from "classnames";

const App = () => {
  const [globalData, setGlobalData] = useState({});
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const getGlobalData = async () => {
      const data = await fetchData();
      setGlobalData(data);
    };
    getGlobalData();
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      setCountries(await fetchCountries());
    };
    getCountries();
  }, []);

  const handleCountryChange = async (country) => {
    const countryData = await fetchData(country);
    setGlobalData(countryData);
    setCountry(country);
  };
  return (
    <div>
      <div className={styles.container}>
        {country ? (
          <span
            id="heading"
            className={cx("red-text text-darken-2", styles.heading)}
          >
            COVID-19 State in {country}
          </span>
        ) : (
          <span
            id="heading"
            className={cx("red-text text-darken-2", styles.heading)}
          >
            Global COVID-19 State
          </span>
        )}
        <Cards data={globalData} />
      </div>
      <CountryPicker
        countries={countries}
        handleCountryChange={handleCountryChange}
      />
      <Charts data={globalData} country={country} />
    </div>
  );
};

export default App;
