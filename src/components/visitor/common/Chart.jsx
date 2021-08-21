import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { groupBydate } from "../../../methods/groupBydate";

function Chart(props) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (props.logsGroupByMonthly.length > 0) {
      const filterData = props.month
        ? props.logsGroupByMonthly.filter((el) => el.month === props.month)
        : props.logsGroupByMonthly;

      if (props.month) {
        setLogs(groupBydate(filterData));
      }
    }
  }, [props.month, props.logsGroupByMonthly]);

  const getDates = () => {
    let datesArr = [];
    logs.forEach((el) => {
      datesArr = [...datesArr, el.date];
    });
    return datesArr;
  };

  const setColumnData = () => {
    let hrsArr = [];
    logs.forEach((el) => {
      hrsArr = [...hrsArr, el.time];
    });

    return hrsArr;
  };

  const optionsColumn = {
    chart: {
      zoomType: "xy",
    },
    title: {
      text: "",
    },
    colors: ["#ffc745"],
    xAxis: [
      {
        categories: getDates(),
        crosshair: true,

        title: {
          text: "Dates",
        },
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: "{value}",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        title: {
          text: "Hours",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: "vertical",
      align: "left",
      x: 120,
      verticalAlign: "top",
      y: 100,
      floating: true,
    },
    series: [
      {
        name: "Hours",
        type: "column",
        data: setColumnData(),
      },
    ],
  };

  return (
    props.logsGroupByMonthly.length > 0 && (
      <HighchartsReact highcharts={Highcharts} options={optionsColumn} />
    )
  );
}

export default Chart;
