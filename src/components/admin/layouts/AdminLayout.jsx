import React from "react";
import Navbar from "../Navbar";
import SideBar from "../sidebar/SideBar";

function AdminLayout(props) {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <div className="row m-0">
        <SideBar />
        {props.children}
      </div>
    </div>
  );
}

export default AdminLayout;
