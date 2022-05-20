import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput";
import { getBims } from "./bimLibSlice";
import BimTable from "./BimTable";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../components/Popup";
import BimForm from "./BimForm";

function BimLibAdmin() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPopup, setOpenPopup] = useState(false);

  const { currentPageBims, bimsById, totalBims } = useSelector(
    (state) => state.bimLib
  );

  const bims = currentPageBims.map((bimId) => bimsById[bimId]);

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
    dispatch(getBims({ filterName, page: page + 1, limit: rowsPerPage }));
  }, [filterName, page, rowsPerPage, dispatch]);

  return (
    <Container sx={{ py: 5 }}>
      {/* <Typography variant="h4" sx={{ mb: 3 }}>
        Products
      </Typography> */}
      <Card sx={{ p: 3, boxShadow: "none" }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenPopup(true)}
            >
              Add new
            </Button>
          </Box>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalBims > 1
                ? `${totalBims} BIMs found`
                : totalBims === 1
                ? `${totalBims} BIM found`
                : "No BIM found"}
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
              count={totalBims ? totalBims : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </Stack>
        <BimTable bims={bims} />
      </Card>
      <Popup title="Category" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <BimForm />
      </Popup>
    </Container>
  );
}

export default BimLibAdmin;
