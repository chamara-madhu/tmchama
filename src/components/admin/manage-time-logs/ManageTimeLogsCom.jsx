import React, { useState, useEffect } from "react";
import axios from "axios";

import Breadcrumb from "../breadcrumb/Breadcrumb";

function ManageTimeLogsCom() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get(`https://tmcham.herokuapp.com/api/timeLog/all`)
      .then((res) => {
        setLogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteProject = (id) => {
    axios
      .delete(`https://tmcham.herokuapp.com/api/timeLog/${id}`)
      .then((res) => {
        const filter = logs.filter((el) => el._id !== id);
        setLogs(filter);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content-col">
      <Breadcrumb title="Manage Team Leader" />

      <div className="container-fluid inner-content py-4">
        <div className="ad-form-sec">
          <div className="content p-0">
            <table className="table table-hover common-table border mb-0">
              <thead>
                <tr>
                  <th className="border-0">From</th>
                  <th className="border-0">To</th>
                  <th className="border-0">Company</th>
                  <th className="border-0">Project</th>
                  <th className="border-0">Description</th>
                  <th className="text-center border-0" width="100">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.length ? (
                  logs.map((el) => (
                    <tr key={el._id}>
                      <td>{el.from}</td>
                      <td>{el.to}</td>
                      <td>{el.companyId}</td>
                      <td>{el.projectId.project}</td>
                      <td>{el.description}</td>
                      <td align="center">
                        <i
                          className="fas fa-pencil-alt mr-3"
                          onClick={() => deleteProject(el._id)}
                        ></i>
                        <i
                          className="fas fa-trash-alt"
                          onClick={() => deleteProject(el._id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No Recods</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTimeLogsCom;
