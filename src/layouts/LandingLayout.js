import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";

function LandingLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default LandingLayout;
