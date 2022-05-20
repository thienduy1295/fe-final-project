import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput";
import { getAllData, getStaffs } from "./staffSlice";
import StaffTable from "./StaffTable";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { getStatusCount, getTasks } from "../task/taskSlice";
import { getBims } from "../bimLibrary/bimLibSlice";

import { PieChart, Pie, Tooltip, Cell } from "recharts";

function Staff() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { currentPageStaffs, usersById, totalUsers, staffList } = useSelector(
    (state) => state.staff
  );

  const users = currentPageStaffs.map((staffId) => usersById[staffId]);

  const dispatch = useDispatch();

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getStaffs({ filterName, page: page + 1, limit: rowsPerPage }));
    dispatch(getAllData());
  }, [filterName, page, rowsPerPage, dispatch]);

  return (
    <Container sx={{ py: 5 }}>
      <Stack minHeight="100vh">
        <Card
          sx={{ mb: 1, p: 3, boxShadow: "none", backgroundColor: "#0088FE" }}
        >
          <Stack direction="row" alignItems="center">
            <Stack>
              <PeopleAltIcon
                sx={{ fontSize: "60px", marginRight: "10px", color: "white" }}
              />
            </Stack>
            <Stack>
              <Typography variant="h6" sx={{ color: "white" }}>
                Staff list
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "white" }}>
                Employee management board
              </Typography>
            </Stack>
          </Stack>
        </Card>
        <Card sx={{ p: 3, boxShadow: "none" }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
              <SearchInput handleSubmit={handleSubmit} />

              <Typography
                variant="subtitle"
                sx={{ color: "text.secondary", ml: 1 }}
              >
                {totalUsers > 1
                  ? `${totalUsers} staffs found`
                  : totalUsers === 1
                  ? `${totalUsers} staff found`
                  : "No staff found"}
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              <TablePagination
                sx={{
                  "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                    {
                      display: { xs: "none", md: "block" },
                    },
                }}
                component="div"
                count={totalUsers ? totalUsers : 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Stack>
          </Stack>
          <StaffTable users={users} />
        </Card>
      </Stack>
    </Container>
  );
}

export default Staff;
