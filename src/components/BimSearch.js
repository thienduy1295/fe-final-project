import { InputAdornment } from "@mui/material";
import React from "react";
import { FTextField } from "./form";
import SearchIcon from "@mui/icons-material/Search";

function BimSearch() {
  return (
    <FTextField
      name="searchQuery"
      sx={{ width: 300 }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default BimSearch;
