import React, { useState } from "react";
import axios from "axios";
import classnames from "classnames";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { auth_token } from "../../../auth/auth";

const initial = {
  project: "",
  projectErr: "",
};

function AddProjectCom() {
  const [form, setForm] = useState({ initial });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      [e.target.name + "Err"]: "",
    });
  };

  // validate
  const validate = () => {
    let projectErr = "";

    if (!form.project) {
      projectErr = "Type is required";
    }

    if (projectErr) {
      setForm({
        ...form,
        projectErr,
      });

      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      const dataObj = {
        project: form.project,
      };

      axios
        .post(`https://tmcham.herokuapp.com/api/project`, dataObj, {
          headers: {
            Authorization: `Bearer ${auth_token()}`,
          },
        })
        .then((res) => {
          setForm(initial);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="content-col">
      <Breadcrumb title="Add Project" />

      <div className="container-fluid inner-content py-4">
        <div className="ad-form-sec">
          <form noValidate>
            <div className="form-row header">
              <div className="form-group col px-sm-2 mb-0">
                <p className="heading mb-0">Add Project</p>
                <p className="info-desc">Type must be unique. Eg: Poruwa</p>
              </div>
            </div>

            <div className="content">
              <div className="form-row">
                <div className="form-group col-md-6 px-sm-2 mb-4">
                  <label htmlFor="project">
                    project <span className="required-tag">*</span>
                  </label>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": form.projectErr,
                    })}
                    id="project"
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{form.projectErr}</div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-submit mt-3"
              onClick={handleSubmit}
              style={{ width: 100, float: "right" }}
            >
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : null}
              {loading ? "" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProjectCom;
