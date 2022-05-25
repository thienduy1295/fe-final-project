import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import TaskAdminList from "../components/TaskAdminList";
import {
  Box,
  Tab,
  Tabs,
  Grid,
  useMediaQuery,
  Typography,
  Badge,
  Popover,
  MenuItem,
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Project from "../features/project/Project";

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

  const [state, setState] = useState({
    value: "One",
    label: "Three",
    content: "One",
    anchorEl: null,
  });

  const open = Boolean(state.anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({ ...state, anchorEl: null });
  };

  const handleMenuItemClick = (menuItem) => {
    handleClose();
    setState({
      ...state,
      label: menuItem,
      content: menuItem,
      value: "project",
    });
  };
  const handleChange = (event, value) => {
    setState({ ...state, value });
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
      icon: <ArrowDropDownIcon sx={{ fontSize: 24 }} onClick={handleClick} />,
      component: <Project />,
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

          <Popover
            open={open}
            anchorEl={state.anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {projectList.map((project) => (
              <MenuItem
                key={project._id}
                onClick={() => handleMenuItemClick("Three")}
              >
                {project.name}
              </MenuItem>
            ))}
          </Popover>
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
