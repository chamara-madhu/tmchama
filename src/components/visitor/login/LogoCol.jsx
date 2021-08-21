import React from "react";
import { withRouter } from "react-router-dom";

import Logo from "../../../assets/images//profile_pic.jpg";

function LogoCol(props) {
  return (
    <div className="col-12 col-md-6 logo-col">
      <div className="logo-back-div">
        <span onClick={() => props.history.goBack()}>
          <i className="fas fa-long-arrow-alt-left"></i> Back
        </span>
        <img src={Logo} className="logo" alt="arti" />
      </div>
    </div>
  );
}

export default withRouter(LogoCol);
