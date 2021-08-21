import React from "react";
import { useHistory } from "react-router-dom";

const ListOfMonths = ({ logsGroupByMonthly, month }) => {
  const history = useHistory();

  return (
    <div className="list-group">
      {logsGroupByMonthly.map((el, i) => (
        <button
          type="button"
          className="list-group-item list-group-item-action d-flex justify-content-between activalign-items-centere"
          aria-current="true"
          key={i}
          onClick={() => history.push(`/company/serendib?m=${el.month}`)}
          style={el.month === month ? { background: "#ffc745" } : {}}
        >
          {el.month}
          <span
            className="badge badge-primary badge-pill"
            style={{
              position: "absolute",
              top: 16,
              right: 15,
              fontWeight: 500,
              fontSize: 11,
              lineHeight: "15px",
            }}
          >
            {el.tolHrs.toFixed(2)} hrs
          </span>
        </button>
      ))}
    </div>
  );
};

export default ListOfMonths;
