import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";
import { Avatar, Divider, Stack } from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch } from "react-redux";

function MainHeader() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      handleMenuClose();
      dispatch({ type: "app/logout" });
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      sx={{ "& .MuiList-root": { backgroundColor: "#FFCB05" } }}
    >
      <Box sx={{ my: 1, px: 2.5 }}>
        <Logo sx={{ width: "80px" }} />
        <Stack direction="row" spacing={1} sx={{ p: "10px 0" }}>
          <Avatar
            src={user.avatarUrl}
            alt={user.name}
            onClick={handleProfileMenuOpen}
          />
          <Stack>
            <Typography variant="subtitle2" noWrap>
              {user?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {user?.email}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/dashboard"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        <DashboardIcon /> Dashboard
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/bimlibrary"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        <LibraryBooksIcon /> Bim Library
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        <SettingsIcon /> Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        <LogoutIcon /> Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo sx={{ width: 200 }} />
          </IconButton>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            mh architects
          </Typography> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Avatar
              src={user.avatarUrl}
              alt={user.name}
              onClick={handleProfileMenuOpen}
            />
          </Box>
          {renderMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
