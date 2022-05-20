import React from "react";
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteBimButton from "./DeleteBimButton";
import EditBimButton from "./EditBimButton";

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
  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: { xs: "20%", sm: "30%" } }}>
                Name
              </TableCell>
              <TableCell
                align="left"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                Category
              </TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bims.map((bim) => {
              const { action, edit } = getAction(bim);

              return (
                <TableRow key={bim._id} hover>
                  <TableCell
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
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {bim.type}
                  </TableCell>

                  <TableCell align="right">
                    {edit} {action}
                  </TableCell>
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
