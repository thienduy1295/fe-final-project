import { Card, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

function BlankLayout() {
  return (
    <Stack
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      // style={{ backgroundColor: "#404040" }}
      sx={{ backgroundColor: "primary.main" }}
    >
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
