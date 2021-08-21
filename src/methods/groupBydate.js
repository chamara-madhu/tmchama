import moment from "moment";
import { getTimeDiff } from "./getTimeDiff";

export const groupBydate = (filterData) => {
  if (filterData.length > 0) {
    const groups = filterData[0].data.reduce((groups, date) => {
      const lead = moment(date.from).format("YYYY-MM-DD");
      if (!groups[lead]) {
        groups[lead] = [];
      }
      groups[lead].push(date);
      return groups;
    }, {});

    const groupBydate = Object.keys(groups).map((date) => {
      return {
        time: groups[date].reduce((currentValue, nextValue) => {
          return currentValue + getTimeDiff(nextValue.from, nextValue.to);
        }, 0),
        date,
        data: groups[date],
      };
    });
    return groupBydate;
  }
};
