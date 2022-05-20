import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteStaff } from "./staffSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";

function DeleteStaffButton({ targetUserId, sx }) {
  const dispatch = useDispatch();

  const btnDelete = (
    <IconButton
      sx={{
        ...sx,
      }}
      color="error"
      onClick={() => dispatch(deleteStaff(targetUserId))}
    >
      <ClearIcon />
    </IconButton>
  );

  return btnDelete;
}

export default DeleteStaffButton;
