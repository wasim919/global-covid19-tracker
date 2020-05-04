import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let modifiedUrl = url;
  console.log(country);
  if (country) modifiedUrl = `${url}/countries/${country}`;
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(modifiedUrl);
    console.log(confirmed);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    return data.map(({ confirmed, recovered, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      recovered: recovered.total,
      deaths: deaths.total,
      date,
    }));
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err.message);
  }
};
