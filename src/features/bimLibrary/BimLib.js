import {
  Alert,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BimFilterCategory from "../../components/BimFilterCategory";
import BimList from "../../components/BimList";
import LoadingScreen from "../../components/LoadingScreen";
import SearchInput from "../../components/SearchInput";
import { getBims } from "./bimLibSlice";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import newCollections from "../../images/newCollections/hero_image.jpg";
import SwipeableTextMobileStepper from "../../components/CarouselEffect";
import CarouselEffect from "../../components/CarouselEffect";

function BimLib() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const { currentPageBims, bimsById, totalBims, totalPage } = useSelector(
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
  const handleOnChange = (event, typeChange) => {
    setValue(event.target.value);
    setFilterType(typeChange);
  };
  useEffect(() => {
    dispatch(
      getBims({ filterName, page: page, limit: rowsPerPage, filterType })
    );
  }, [filterName, filterType, page, rowsPerPage, dispatch]);

  const resetFilters = () => {
    dispatch(
      getBims({
        filterName: "",
        filterType: "",
      })
    );
    setValue("");
    setFilterName("");
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        sx={{ display: { xs: "none", lg: "block", md: "block" } }}
        md={3}
        lg={3}
      >
        <Card variant="oulined">
          <Stack>
            <BimFilterCategory
              handleOnChange={handleOnChange}
              value={value}
              resetFilter={resetFilters}
              handleSubmit={handleSubmit}
            />
            <Button
              variant="contained"
              onClick={resetFilters}
              startIcon={<ClearAllIcon />}
              sx={{ borderRadius: "0" }}
            >
              <Typography>Clear All</Typography>
            </Button>
          </Stack>
        </Card>
      </Grid>

      <Grid item xs={12} md={9} lg={9}>
        <Card variant="oulined" sx={{ p: 3 }}>
          <Card
            sx={{
              backgroundColor: "#FDF8F2",
              boxShadow: "none",
              borderRadius: 7,
            }}
          >
            {/* <CardMedia
              component="img"
              height="300"
              image={newCollections}
              alt="image Collections"
            /> */}
            <CarouselEffect />
          </Card>
          <Stack>
            <Box>
              {loading ? (
                <LoadingScreen />
              ) : (
                <>
                  {error ? (
                    <Alert severity="error">{error}</Alert>
                  ) : (
                    <>
                      <BimList bims={bims} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 3,
                        }}
                      >
                        <Pagination
                          count={totalPage}
                          page={page}
                          onChange={handleChangePage}
                          color="primary"
                        />
                      </Box>
                    </>
                  )}
                </>
              )}
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default BimLib;
