import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";

import LogoCol from "./LogoCol";

function CommonLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [authErr, setAuthErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      setEmailErr("");
    } else {
      setPassword(e.target.value);
      setPasswordErr("");
    }
  };

  // validate
  const validate = () => {
    let emailErr = "";
    let passwordErr = "";

    if (!email) {
      emailErr = "Email is required";
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      emailErr = "Email is invalid";
    }

    if (!password) {
      passwordErr = "Password is required";
    }

    if (emailErr || passwordErr) {
      setEmailErr(emailErr);
      setPasswordErr(passwordErr);

      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      const data = {
        email: email,
        password: password,
      };

      axios
        .post(`https://tmcham.herokuapp.com/api/auth/login`, data)
        .then((res) => {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("user_data", JSON.stringify(res.data.user));

          setEmail("");
          setPassword("");
          setEmailErr("");
          setPasswordErr("");
          setLoading(false);

          props.history.push("/admin/add-time-log");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.code === 1000) {
            setAuthErr(err.response.data.message);
          }
          setLoading(false);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <LogoCol />

        <div className="col-12 col-md-6 login-reg-col">
          <div className="login-reg-container">
            <p className="heading">Login</p>
            <p style={{ fontSize: 14, color: "#dc3545" }}>{authErr}</p>
            <form noValidate>
              <div className="form-group p-0">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={classnames("form-control", {
                    "is-invalid": emailErr,
                  })}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                />
                <div className="invalid-feedback">{emailErr}</div>
              </div>
              <div className="form-group p-0 mb-0">
                <label htmlFor="inputPassword4">Password</label>
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": passwordErr,
                  })}
                  id="pwd"
                  name="password"
                  onChange={handleChange}
                  value={password}
                />
                <div className="invalid-feedback">{passwordErr}</div>
              </div>

              <button
                type="submit"
                className="btn-submit"
                onClick={handleSubmit}
              >
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : null}
                {loading ? "" : "Login"}
              </button>
            </form>
            <Link to="/forget-password" className="forget-password-link">
              Forgot your Password?
            </Link>
            <p className="mt-2 form-bellow-link">
              Don't have an account?{" "}
              <Link to="/Create-an-account" className="login-now-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CommonLogin);
