import React from "react";
import AdminTemplate from "../../templates/admin-template";
import AdminStudents from "../../components/admin/admin-students";

const AdminStudentsPage = () => {
  return (
    <AdminTemplate>
      <AdminStudents />
    </AdminTemplate>
  );
};

export default AdminStudentsPage;
