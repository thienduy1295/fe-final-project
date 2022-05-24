import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TaskAdminList from "../components/TaskAdminList";
import {
  Box,
  Tab,
  Tabs,
  Grid,
  useMediaQuery,
  Typography,
  Badge,
} from "@mui/material";
import { capitalCase } from "change-case";
import Staff from "../features/staff/Staff";
import AdminBim from "../features/bimLibrary/AdminBim";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardInfo from "../components/DashboardInfo";
import { useSelector } from "react-redux";
import { getStatusCount } from "../features/task/taskSlice";
import { useDispatch } from "react-redux";
import { getAllProject } from "../features/project/projectSlice";

function Dashboard() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const mediumViewport = useMediaQuery("(min-width:1024px)");

  const { countStatusType } = useSelector((state) => state.task);
  const { projectList } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatusCount());
    dispatch(getAllProject());
  }, [dispatch]);

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
      icon: (
        <Badge badgeContent={countStatusType.review} color="error" showZero>
          <AssignmentIcon sx={{ fontSize: 24 }} />
        </Badge>
      ),
      component: <TaskAdminList />,
    },
    {
      value: "bim library",
      icon: <ArtTrackIcon sx={{ fontSize: 24 }} />,
      component: <AdminBim />,
    },
    {
      value: "project",
      icon: <AccountTreeIcon sx={{ fontSize: 24 }} />,
      component: [],
    },
  ];

  return (
    <Grid container style={{ backgroundColor: "#FFCB05" }}>
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
