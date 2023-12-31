import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/common/scroll-to-top/scroll-to-top";
import LoginPage from "../pages/user/login-page";
import DashboardPage from "../pages/admin/dashboard-page";
import AdminStudentsPage from "../pages/admin/admin-students-page";
import NotFoundPage from "../pages/common/not-found-page";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/">
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/admin">
          <Route index element={<DashboardPage />} />
          <Route path="students">
            <Route index element={<AdminStudentsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
