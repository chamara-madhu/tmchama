import React, { useState, useEffect } from "react";
import axios from "axios";
import classnames from "classnames";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { auth_token } from "../../../auth/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initial = {
  from: "",
  to: "",
  companyId: "",
  projectId: "",
  description: "",
  toErr: "",
  fromErr: "",
  companyIdErr: "",
  projectIdErr: "",
  descriptionErr: "",
};

function AddTimeLogCom() {
  const [form, setForm] = useState({ initial });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://tmcham.herokuapp.com/api/project`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      [e.target.name + "Err"]: "",
    });
  };

  const validate = () => {
    let fromErr = "";
    let toErr = "";
    let companyIdErr = "";
    let projectIdErr = "";
    let descriptionErr = "";

    if (!form.from) {
      fromErr = "Date and time is required";
    }

    if (!form.to) {
      toErr = "date and time is required";
    }

    if (form.from > form.to) {
      fromErr = "Invalid Dates and times";
      toErr = "Invalid Dates and times";
    }

    if (!form.companyId) {
      companyIdErr = "Company is required";
    }

    if (!form.projectId) {
      projectIdErr = "project type is required";
    }

    if (!form.description) {
      descriptionErr = "Description is required";
    }

    if (fromErr || toErr || companyIdErr || projectIdErr || descriptionErr) {
      setForm({
        ...form,
        fromErr,
        toErr,
        companyIdErr,
        projectIdErr,
        descriptionErr,
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
        from: form.from,
        to: form.to,
        projectId: form.projectId,
        companyId: form.companyId,
        description: form.description,
      };

      axios
        .post(`https://tmcham.herokuapp.com/api/timeLog`, dataObj, {
          headers: {
            Authorization: `Bearer ${auth_token()}`,
          },
        })
        .then((res) => {
          toast.success("Added successfully!");
          setForm(initial);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.warn("Error!");
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="content-col">
        <Breadcrumb title="Add Time Log" />

        <div className="container-fluid inner-content py-4">
          <div className="ad-form-sec">
            <form noValidate>
              <div className="form-row header">
                <div className="form-group col px-sm-2 mb-0">
                  <p className="heading mb-0">Add Time Log</p>
                  {/* <p className="info-desc">Type must be unique. Eg: Toyota</p> */}
                </div>
              </div>

              <div className="content">
                <div className="form-row">
                  <div className="form-group col-md-6 px-sm-2 mb-4">
                    <label htmlFor="from">
                      From <span className="required-tag">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      className={classnames("form-control", {
                        "is-invalid": form.fromErr,
                      })}
                      id="from"
                      name="from"
                      value={form.from}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{form.fromErr}</div>
                  </div>
                  <div className="form-group col-md-6 px-sm-2 mb-4">
                    <label htmlFor="to">
                      To <span className="required-tag">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      className={classnames("form-control", {
                        "is-invalid": form.toErr,
                      })}
                      id="to"
                      name="to"
                      value={form.to}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{form.toErr}</div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 px-sm-2 mb-4">
                    <label htmlFor="companyId">
                      Company <span className="required-tag">*</span>
                    </label>
                    <select
                      className={classnames("form-control", {
                        "is-invalid": form.companyIdErr,
                      })}
                      id="companyId"
                      name="companyId"
                      value={form.companyId}
                      onChange={handleChange}
                    >
                      <option value="" selected hidden>
                        -- Select --
                      </option>
                      <option value="serendib">Serendib</option>
                      <option value="eyepax">Eyepax</option>
                      {/* {projects.map((el, i) => (
                      <option value={el._id} key={i}>
                        {el.project}
                      </option>
                    ))} */}
                    </select>
                    <div className="invalid-feedback">{form.companyIdErr}</div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 px-sm-2 mb-4">
                    <label htmlFor="projectId">
                      Project Type <span className="required-tag">*</span>
                    </label>
                    <select
                      className={classnames("form-control", {
                        "is-invalid": form.projectIdErr,
                      })}
                      id="projectId"
                      name="projectId"
                      value={form.projectId}
                      onChange={handleChange}
                    >
                      <option value="" selected hidden>
                        -- Select --
                      </option>
                      {projects.map((el, i) => (
                        <option value={el._id} key={i}>
                          {el.project}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">{form.projectIdErr}</div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col px-sm-2 mb-4">
                    <label htmlFor="description">
                      Description <span className="required-tag">*</span>
                    </label>
                    <textarea
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": form.descriptionErr,
                      })}
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows="6"
                    />
                    <div className="invalid-feedback">
                      {form.descriptionErr}
                    </div>
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
      <ToastContainer />
    </>
  );
}

export default AddTimeLogCom;
