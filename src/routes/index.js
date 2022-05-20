import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import LandingLayout from "../layouts/LandingLayout";
import MainLayout from "../layouts/MainLayout";
import NotiLayout from "../layouts/NotiLayout";
import AccountPage from "../pages/AccountPage";
import BimLibrary from "../pages/BimLibrary";
import Dashboard from "../pages/Dashboard";
import LandingView from "../pages/LandingView";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import NotPermissionPage from "../pages/NotPermissionPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";
import AuthRoleAdmin from "./AuthRoleAdmin";

function Router() {
  return (
    <Routes>
      <Route
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="bimlibrary" element={<BimLibrary />} />
        <Route path="account" element={<AccountPage />} />
        <Route
          path="dashboard"
          element={
            <AuthRoleAdmin>
              <Dashboard />
            </AuthRoleAdmin>
          }
        />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<LandingView />} />
      </Route>
      <Route element={<NotiLayout />}>
        <Route path="/NotPermission" element={<NotPermissionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
