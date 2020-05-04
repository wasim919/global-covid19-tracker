import React, { Fragment } from "react";
import M from "materialize-css/dist/css/materialize.min.css";
import CountUp from "react-countup";
import styles from "./Cards.module.css";
import cx from "classnames";
import ReactLoading from "react-loading";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) return <div></div>;
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col s12 m4 l4">
            <div className={cx("card z-depth-2", styles.cardConfirmed)}>
              <div className={cx("card-content", styles.cardContent)}>
                <span
                  className={cx(
                    "card-title blue-text text-lighten-2",
                    styles.cardTitle
                  )}
                >
                  Infected
                </span>
                <CountUp
                  start={0}
                  end={confirmed.value}
                  duration={2.5}
                  separator=","
                />
                <br />
                <span>{new Date(lastUpdate).toDateString()}</span>
                <br />
                <span>Number of active cases of COVID-19</span>
              </div>
            </div>
          </div>
          <div className="col s12 m4 l4">
            <div className={cx("card z-depth-2", styles.cardRecovered)}>
              <div className={cx("card-content", styles.cardContent)}>
                <span
                  className={cx(
                    "card-title green-text text-darken-1",
                    styles.cardTitle
                  )}
                >
                  Recovered
                </span>
                <CountUp
                  start={0}
                  end={recovered.value}
                  duration={2.5}
                  separator=","
                />
                <br />
                <span>{new Date(lastUpdate).toDateString()}</span>
                <br />
                <span>Number of recovered cases of COVID-19</span>
              </div>
            </div>
          </div>

          <div className="col s12 m4 l4">
            <div className={cx("card z-depth-2", styles.cardDead)}>
              <div className={cx("card-content", styles.cardContent)}>
                <span
                  className={cx(
                    "card-title red-text text-darken-2",
                    styles.cardTitle
                  )}
                >
                  Deaths
                </span>
                <CountUp
                  start={0}
                  end={deaths.value}
                  duration={2.5}
                  separator=","
                />
                <br />
                <span>{new Date(lastUpdate).toDateString()}</span>
                <br />
                <span>Number of deaths caused by COVID-19</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cards;
