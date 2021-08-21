import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import ListOfMonths from "../common/ListOfMonths";
import ListOfTasks from "../common/ListOfTasks";
import Chart from "../common/Chart";

function HomeMain() {
  const [logsGroupByMonthly, setLogsGroupByMonthly] = useState([]);
  const { company } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const month = queryParams.get("m");

  useEffect(() => {
    axios
      .get(`https://tmcham.herokuapp.com/api/timeLog/${company}`)
      .then((res) => {
        const groups = res.data.reduce((groups, month) => {
          const lead = moment(month.from).format("MMMM");
          if (!groups[lead]) {
            groups[lead] = [];
          }
          groups[lead].push(month);
          return groups;
        }, {});

        const groupByMonth = Object.keys(groups).map((month) => {
          return {
            tolHrs: groups[month].reduce((currentValue, nextValue) => {
              return currentValue + getTimeDiff(nextValue.from, nextValue.to);
            }, 0),
            month,
            data: groups[month],
          };
        });

        setLogsGroupByMonthly(groupByMonth);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getTimeDiff = (date1, date2) => {
    const from = new Date(date1);
    const to = new Date(date2);
    var differenceTravel = to.getTime() - from.getTime();
    var minutes = Math.floor(differenceTravel / (1000 * 60));

    return minutes / 60;
  };

  return (
    <div className="container-fluid px-0">
      <div className="row m-0">
        <div className="sidebar-col">
          <ListOfMonths logsGroupByMonthly={logsGroupByMonthly} month={month} />
        </div>
        <div className="log-tasks-col">
          <ListOfTasks logsGroupByMonthly={logsGroupByMonthly} month={month} />
        </div>
        <div className="analytics-col">
          <Chart logsGroupByMonthly={logsGroupByMonthly} month={month} />
        </div>
      </div>
    </div>
  );
}

export default HomeMain;
