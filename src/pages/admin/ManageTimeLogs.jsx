import React from "react";

import AdminLayout from "../../components/admin/layouts/AdminLayout";
import ManageTimeLogsCom from "../../components/admin/manage-time-logs/ManageTimeLogsCom";

function ManageTimeLogs() {
  return (
    <AdminLayout>
      <ManageTimeLogsCom />
    </AdminLayout>
  );
}

export default ManageTimeLogs;
