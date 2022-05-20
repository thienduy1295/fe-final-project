import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { Box } from "@mui/material";
import logoImg from "../logo2.png";

function LogoLandingView({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 40, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default LogoLandingView;
