import React from "react";
import Navbar from "../navbar/Navbar";

function VisitorLayout(props) {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      {props.children}
    </div>
  );
}

export default VisitorLayout;
