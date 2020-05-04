import React, { Fragment, useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import styles from "./Charts.module.css";
import cx from "classnames";
import ReactLoading from "react-loading";

defaults.global.defaultFontFamily = "Oswald, sans-serif";
defaults.global.defaultFontSize = 14;
defaults.global.defaultFontColor = "black";

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});
  console.log(country);

  useEffect(() => {
    const fetchFromAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchFromAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "rgb(0, 255, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "rgb(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current State in ${country}` },
      }}
    />
  ) : null;
  if (!confirmed) return <div></div>;
  return (
    <Fragment>
      <div className={styles.container}>
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card z-depth-2">
              <div className={cx("card-content", styles.cardContent)}>
                {country ? barChart : lineChart}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Charts;
