import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function SideBar(props) {
  return (
    <div className="admin-sidebar-col  sidebar-cus">
      <div className="fixed-div">
        <div className="accordion">Time Logs</div>
        <div className="panel">
          <Link
            to="/admin/add-time-log"
            className={
              props.history.location.pathname === "/admin/add-time-log"
                ? "active-tab"
                : ""
            }
          >
            <i className="fas fa-plus mr-2"></i> Add Time Log
          </Link>
          <Link
            to="/admin/manage-time-logs"
            className={
              props.history.location.pathname === "/admin/manage-time-logs"
                ? "active-tab"
                : ""
            }
          >
            <i className="fas fa-pencil-alt mr-2"></i> Manage Time Logs
          </Link>
        </div>
        <div className="accordion">Projects</div>
        <div className="panel">
          <Link
            to="/admin/add-project"
            className={
              props.history.location.pathname === "/admin/add-project"
                ? "active-tab"
                : ""
            }
          >
            <i className="fas fa-plus mr-2"></i> Add Project
          </Link>
          <Link
            to="/admin/manage-projects"
            className={
              props.history.location.pathname === "/admin/manage-projects"
                ? "active-tab"
                : ""
            }
          >
            <i className="fas fa-pencil-alt mr-2"></i> Manage Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SideBar);
