import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

function NotiLayout() {
  return (
    <Stack
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      style={{ backgroundColor: "#404040" }}
    >
      <Logo sx={{ width: 90, height: 90, mb: 5 }} />
      <Outlet />
    </Stack>
  );
}

export default NotiLayout;
