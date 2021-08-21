import React from "react";

import AdminLayout from "../../components/admin/layouts/AdminLayout";
import ManageProjectsCom from "../../components/admin/manage-project/ManageProjectsCom";

function ManageProjects() {
  return (
    <AdminLayout>
      <ManageProjectsCom />
    </AdminLayout>
  );
}

export default ManageProjects;
