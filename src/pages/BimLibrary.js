import React, { useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BimList from "../features/bimLibrary/BimLib";
import TaskList from "../features/task/TaskList";
import { Badge, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { capitalCase } from "change-case";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTaskOfStaff } from "../features/task/taskSlice";

function BimLibrary() {
  let count = 0;
  const [currentTab, setCurrentTab] = useState("bimLibrary");
  const { tasksOfStaff } = useSelector((state) => state.task);

  tasksOfStaff.map((task) => (task.status === "todo" ? (count += 1) : null));

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  console.log(tasksOfStaff.length);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskOfStaff());
  }, [dispatch]);

  const PROFILE_TABS = [
    {
      value: "bimLibrary",
      icon: <LibraryBooksIcon sx={{ fontSize: 24 }} />,
      component: <BimList />,
    },
    {
      value: "planner",
      icon: (
        <Badge badgeContent={count} color="error" showZero>
          <AssignmentIcon sx={{ fontSize: 24 }} />
        </Badge>
      ),
      component: <TaskList />,
    },
  ];

  return (
    <Stack>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => handleChangeTab(value)}
        sx={{ background: "#FFCB05", paddingLeft: 3 }}
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

      {PROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key="{tab.value}">{tab.component}</Box>;
      })}
    </Stack>
  );
}

export default BimLibrary;
