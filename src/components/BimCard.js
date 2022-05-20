import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function BimCard({ bim }) {
  return (
    <Card
      variant="outlined"
      style={{ border: "none" }}
      onClick={() => (window.location = `${bim.fileUrl}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={bim.imageUrl}
          alt={bim.name}
          sx={{ borderRadius: 4, height: "200px" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            component="div"
            noWrap
            color="text.secondary"
          >
            {bim.type}
          </Typography>
          <Typography
            gutterBottom
            color="primary.main"
            fontWeight="600"
            component="div"
            noWrap
          >
            {bim.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default BimCard;
