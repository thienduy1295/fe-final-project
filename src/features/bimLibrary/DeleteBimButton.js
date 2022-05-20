import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBim } from "./bimLibSlice";

function DeleteBimButton({ bimId, sx }) {
  const dispatch = useDispatch();

  const btnDelete = (
    <Button
      sx={{
        fontSize: "0.7rem",
        color: "#e74c3c",
        borderColor: "#e74c3c",
        ...sx,
      }}
      size="medium"
      startIcon={<DeleteIcon />}
      variant="outlined"
      onClick={() => dispatch(deleteBim(bimId))}
    >
      Delete
    </Button>
  );

  return btnDelete;
}

export default DeleteBimButton;
