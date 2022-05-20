import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";

import Popup from "../../components/Popup";
import EditBimForm from "./EditBimForm";

function EditBimButton({ bimInfo, bimId, sx }) {
  const [openPopup, setOpenPopup] = useState(false);

  const btnEdit = (
    <>
      <IconButton
        sx={{
          fontSize: "0.7rem",
          color: "#0089CD",
          ...sx,
        }}
        onClick={() => setOpenPopup(true)}
      >
        <EditIcon />
      </IconButton>
      <Popup title="Category" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <EditBimForm bimInfo={bimInfo} bimId={bimId} />
      </Popup>
    </>
  );

  return btnEdit;
}

export default EditBimButton;
