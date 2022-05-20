import { IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import ClearIcon from "@mui/icons-material/Clear";

import { deleteBim } from "./bimLibSlice";

function DeleteBimButton({ bimId, sx }) {
  const dispatch = useDispatch();

  const btnDelete = (
    <IconButton
      sx={{
        ...sx,
      }}
      color="error"
      onClick={() => dispatch(deleteBim(bimId))}
    >
      <ClearIcon />
    </IconButton>
  );

  return btnDelete;
}

export default DeleteBimButton;
