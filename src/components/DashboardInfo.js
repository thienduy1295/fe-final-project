import {
  Box,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getStatusCount, getTasks } from "../features/task/taskSlice";
import { getAllData, getStaffs } from "../features/staff/staffSlice";
import { getBims } from "../features/bimLibrary/bimLibSlice";

function DashboardInfo() {
  const { countStatusType } = useSelector((state) => state.task);
  const { tasksList } = useSelector((state) => state.task);
  const { totalBims } = useSelector((state) => state.bimLib);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatusCount());
    dispatch(getAllData());
    dispatch(getTasks());
    dispatch(getBims({ filterName: "" }));
  }, [dispatch]);

  const { staffList } = useSelector((state) => state.staff);
  // console.log(countStatusType.todo);
  const data = [
    { name: "Todo", value: countStatusType.todo },
    { name: "Review", value: countStatusType.review },
    { name: "Done", value: countStatusType.done },
  ];

  const totalTasks =
    countStatusType.todo + countStatusType.review + countStatusType.done;
  const totalData = [{ name: "Total Tasks", value: totalTasks }];

  const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#00C49F"];

  return (
    <Container>
      <Stack minHeight="100vh">
        <Typography variant="h4" sx={{ mb: 1, mt: 3 }}>
          Welcome Admin!
        </Typography>
        <Typography variant="body1">Dashboard</Typography>
        <Divider />
        <Typography variant="h5" sx={{ mt: 3 }}>
          Overview
        </Typography>

        <Card sx={{ p: 3, mb: 2 }}>
          <Stack direction="row">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Pie
                data={totalData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                fill="#00C49F"
                label
              />
              <Tooltip />
            </PieChart>
            <Stack spacing={1} sx={{ ml: 5 }}>
              <Chip label="Total tasks" sx={{ backgroundColor: "#00C49F" }} />
              <Chip label="To do task" sx={{ backgroundColor: "#0088FE" }} />
              <Chip
                label="Task to review"
                sx={{ backgroundColor: "#FF8042" }}
              />
              <Chip
                label="Task completed"
                sx={{ backgroundColor: "#FFBB28" }}
              />
            </Stack>
          </Stack>
        </Card>

        <Grid container spacing={2}>
          <Grid item md={4} xs={4}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 3,
              }}
            >
              <Box sx={{ width: "40px" }}>
                <PersonIcon sx={{ fontSize: 50, color: "#9368E9" }} />
              </Box>
              <Stack>
                <Typography>{staffList.length}</Typography>
                <Typography>Total staff</Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid item md={4} xs={4}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 3,
              }}
            >
              <Box sx={{ width: "40px" }}>
                <AssignmentIcon sx={{ fontSize: 50, color: "#FFBC34" }} />
              </Box>
              <Stack>
                <Typography>{tasksList.length}</Typography>
                <Typography>Total tasks</Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid item md={4} xs={4}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 3,
              }}
            >
              <Box sx={{ width: "40px" }}>
                <LibraryBooksIcon sx={{ fontSize: 50, color: "#F62D51" }} />
              </Box>
              <Stack>
                <Typography>{totalBims}</Typography>

                <Typography>Total BIM models</Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

export default DashboardInfo;
