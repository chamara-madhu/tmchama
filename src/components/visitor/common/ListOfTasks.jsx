import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { getTimeDiff } from "../../../methods/getTimeDiff";
import { groupBydate } from "../../../methods/groupBydate";

const ListOfTasks = (props) => {
  const [logs, setLogs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (props.logsGroupByMonthly.length > 0) {
      const filterData = props.month
        ? props.logsGroupByMonthly.filter((el) => el.month === props.month)
        : props.logsGroupByMonthly;

      if (!props.month) {
        history.push(`/company/serendib?m=${filterData[0].month}`);
      } else {
        setLogs(groupBydate(filterData));
      }
    }
  }, [props.month, props.logsGroupByMonthly]);

  return (
    <>
      <h5 className="mb-3">{props.month}</h5>
      <div className="accordion" id="accordionTasks">
        {logs.map((el, i) => (
          <div className="card" key={i}>
            <div
              id={`heading${i + 1}`}
              className="card-header collapsed btn btn-link btn-block text-left p-2"
              type="button"
              data-toggle="collapse"
              data-target={`#collapse${i + 1}`}
              aria-expanded="true"
              aria-controls={`collapse${i + 1}`}
            >
              {el.date}
              <span
                className="badge badge-primary badge-pill cus-badge"
                style={{
                  fontWeight: 500,
                }}
              >
                {el.time.toFixed(2)} hrs
              </span>
            </div>

            <div
              id={`collapse${i + 1}`}
              className="collapse"
              aria-labelledby={`heading${i + 1}`}
              data-parent="#accordionTasks"
            >
              <div className="card-body p-0">
                <table className="time-log-table">
                  <tbody>
                    {el.data.map((el, i) => (
                      <tr key={i}>
                        <td className="task-desc">
                          <p className="mb-2">
                            <span className="time-range">
                              {moment(el.from).format("hh:mm a")} -{" "}
                              {moment(el.to).format("hh:mm a")}
                            </span>{" "}
                            <label className="project-label">
                              {el.projectId.project}
                            </label>
                          </p>
                          <p className="text-muted mb-0">{el.description}</p>
                        </td>
                        <td
                          width="80"
                          align="right"
                          style={{ fontWeight: 500 }}
                        >
                          {getTimeDiff(el.from, el.to).toFixed(2)} hrs
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListOfTasks;
