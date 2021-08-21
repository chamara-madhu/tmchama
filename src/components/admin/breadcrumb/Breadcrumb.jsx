import React from "react";

function Breadcrumb(props) {
  return (
    <nav aria-label="breadcrumb" className="inner-breadcrumb">
      <ol className="breadcrumb rounded-0 mb-0">
        <li className="breadcrumb-item" aria-current="page">
          {props.title}
        </li>
        <li className="breadcrumb-item" aria-current="page">
          {props.title}
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
