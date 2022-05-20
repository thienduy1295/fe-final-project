import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteStaff } from "./staffSlice";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteStaffButton({ targetUserId, sx }) {
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
      onClick={() => dispatch(deleteStaff(targetUserId))}
    >
      Delete
    </Button>
  );

  return btnDelete;
}

export default DeleteStaffButton;
