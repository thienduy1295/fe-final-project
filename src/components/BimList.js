import { Grid } from "@mui/material";
import React from "react";
import Bounce from "react-reveal/Bounce";
import BimCard from "./BimCard";

function BimList({ bims }) {
  return (
    <Grid container spacing={2} mt={1}>
      {bims &&
        bims.map((bim) => (
          <Grid item key={bim._id} xs={6} md={4} lg={2.4}>
            <Bounce>
              <BimCard bim={bim} />
            </Bounce>
          </Grid>
        ))}
    </Grid>
  );
}

export default BimList;
