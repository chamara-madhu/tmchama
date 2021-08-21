import React, { useState, useEffect } from "react";
import axios from "axios";

import Breadcrumb from "../breadcrumb/Breadcrumb";

function ManageProjectsCom() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`https://tmcham.herokuapp.com/api/project`)
      .then((res) => {
        // setLoading(false);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
      });
  }, []);

  // const getNotUsedTL = (code) => {
  //   const weeklyReviews = localStorage.getItem("weekly_Reviews")
  //     ? JSON.parse(localStorage.getItem("weekly_Reviews"))
  //     : [];

  //   const findTL = weeklyReviews.filter((el) => el.teamLeader.code === code);

  //   if (findTL.length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const deleteProject = (id) => {
    axios
      .delete(`https://tmcham.herokuapp.com/api/project/${id}`)
      .then((res) => {
        const filter = projects.filter((el) => el._id !== id);
        setProjects(filter);
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
                  <th className="border-0">Type</th>
                  <th className="text-center border-0" width="100">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.length ? (
                  projects.map((el) => (
                    <tr key={el._id}>
                      <td>{el.project}</td>
                      <td align="center">
                        <i
                          className="fas fa-pencil-alt mr-3"
                          onClick={() => deleteProject(el._id)}
                        ></i>

                        {/* {getNotUsedTL(el.id) ? (
                          <i className="fas fa-trash-alt fa-trash-disabled"></i>
                        ) : ( */}
                        <i
                          className="fas fa-trash-alt"
                          onClick={() => deleteProject(el._id)}
                        ></i>
                        {/* // )}  */}
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

export default ManageProjectsCom;
