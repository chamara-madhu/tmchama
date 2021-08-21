import React from "react";

import AdminLayout from "../../components/admin/layouts/AdminLayout";
import AddProjectCom from "../../components/admin/manage-project/AddProjectCom";

import "../../styles/admin/common.css";

function AddProject() {
  return (
    <AdminLayout>
      <AddProjectCom />
    </AdminLayout>
  );
}

export default AddProject;
