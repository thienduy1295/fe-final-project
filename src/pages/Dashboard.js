import React, { useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";

import TaskAdminList from "../components/TaskAdminList";
import { Box, Tab, Tabs, Grid, useMediaQuery, Typography } from "@mui/material";
import { capitalCase } from "change-case";
import Staff from "../features/staff/Staff";
import AdminBim from "../features/bimLibrary/AdminBim";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardInfo from "../components/DashboardInfo";

function Dashboard() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const mediumViewport = useMediaQuery("(min-width:768px)");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "dashboard",
      icon: <DashboardIcon sx={{ fontSize: 24 }} />,
      component: <DashboardInfo />,
    },
    {
      value: "staff",
      icon: <AccountCircleIcon sx={{ fontSize: 24 }} />,
      component: <Staff />,
    },
    {
      value: "planner",
      icon: <AssignmentIcon sx={{ fontSize: 24 }} />,
      component: <TaskAdminList />,
    },
    {
      value: "bim library",
      icon: <ArtTrackIcon sx={{ fontSize: 24 }} />,
      component: <AdminBim />,
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item md={2} sm={12}>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          orientation={mediumViewport ? "vertical" : "horizontal"}
          variant="scrollable"
          indicatorColor="primary"
          allowScrollButtonsMobile
          onChange={(e, value) => handleChangeTab(value)}
          style={{ backgroundColor: "#FFCB05" }}
        >
          {PROFILE_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={<Typography>{capitalCase(tab.value)}</Typography>}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Grid>
      <Grid item md={10} sm={12}>
        {/* <Box sx={{ mb: 5 }} /> */}

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return (
            isMatched && (
              <Box
                sx={{ backgroundColor: "primary.lighter" }}
                key="{tab.value}"
              >
                {tab.component}
              </Box>
            )
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
