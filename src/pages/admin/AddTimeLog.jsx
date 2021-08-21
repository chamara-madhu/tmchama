import React from "react";

import AdminLayout from "../../components/admin/layouts/AdminLayout";
import AddTimeLogCom from "../../components/admin/manage-time-logs/AddTimeLogCom";

import "../../styles/admin/common.css";

function AddTimeLog() {
  return (
    <AdminLayout>
      <AddTimeLogCom />
    </AdminLayout>
  );
}

export default AddTimeLog;
