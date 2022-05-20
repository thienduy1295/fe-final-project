import { Button } from "@mui/material";
import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";

import Popup from "../../components/Popup";
import EditBimForm from "./EditBimForm";

function EditBimButton({ bimInfo, bimId, sx }) {
  const [openPopup, setOpenPopup] = useState(false);

  const btnEdit = (
    <>
      <Button
        sx={{
          fontSize: "0.7rem",
          ...sx,
        }}
        size="medium"
        startIcon={<DeleteIcon />}
        variant="outlined"
        // onClick={() => dispatch(editBim(bimId))}
        onClick={() => setOpenPopup(true)}
      >
        Edit
      </Button>
      <Popup title="Category" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <EditBimForm bimInfo={bimInfo} bimId={bimId} />
      </Popup>
    </>
  );

  return btnEdit;
}

export default EditBimButton;
