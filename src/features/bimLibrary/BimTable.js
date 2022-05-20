import React, { useState } from "react";
import {
  Avatar,
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import DeleteBimButton from "./DeleteBimButton";
import EditBimButton from "./EditBimButton";
import { fDate } from "../../utils/formatTime";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function BimTable({ bims }) {
  const getAction = (bim) => {
    const props = {
      bimId: bim._id,
      bimInfo: bim,
    };
    return {
      action: <DeleteBimButton {...props} />,
      edit: <EditBimButton {...props} />,
    };
  };

  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("name");

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
    stabilizedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedRowArray.map((el) => el[0]);
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: { xs: "20%", sm: "30%" } }}>
                <TableSortLabel
                  active={valueToOrderBy === "name"}
                  direction={valueToOrderBy === "name" ? orderDirection : "asc"}
                  onClick={createSortHandler("name")}
                >
                  Name
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                <TableSortLabel
                  active={valueToOrderBy === "type"}
                  direction={valueToOrderBy === "type" ? orderDirection : "asc"}
                  onClick={createSortHandler("type")}
                >
                  Category
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                <TableSortLabel
                  active={valueToOrderBy === "createdAt"}
                  direction={
                    valueToOrderBy === "createdAt" ? orderDirection : "asc"
                  }
                  onClick={createSortHandler("createdAt")}
                >
                  Created Day
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                <TableSortLabel
                  active={valueToOrderBy === "updatedAt"}
                  direction={
                    valueToOrderBy === "updatedAt" ? orderDirection : "asc"
                  }
                  onClick={createSortHandler("updatedAt")}
                >
                  Updated Day
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRowInformation(
              bims,
              getComparator(orderDirection, valueToOrderBy)
            ).map((bim) => {
              const { action, edit } = getAction(bim);

              return (
                <TableRow key={bim._id} hover>
                  <StyledTableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      alt={bim.name}
                      src={bim.imageUrl}
                      sx={{ mr: 2 }}
                      variant="rounded"
                    />
                    {bim.name}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {bim.type}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {fDate(bim.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {fDate(bim.updatedAt)}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {edit}
                    {action}
                  </StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BimTable;
