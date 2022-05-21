import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import SearchInput from "./SearchInput";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "Annotations", label: "Annotations" },
  { value: "Boundary Conditions", label: "Boundary Conditions" },
  { value: "Cable Tray", label: "Cable Tray" },
  { value: "Casework", label: "Casework" },
  { value: "Columns", label: "Columns" },
  { value: "Conduit", label: "Conduit" },
  { value: "Curtain Panel By Pattern", label: "Curtain Panel By Pattern" },
  { value: "Curtain Wall Panels", label: "Curtain Wall Panels" },
  { value: "Detail Items", label: "Detail Items" },
  { value: "Doors", label: "Doors" },
  { value: "Duct", label: "Duct" },
  { value: "Electrical", label: "Electrical" },
  { value: "Entourage", label: "Entourage" },
  { value: "Fire Protection", label: "Fire Protection" },
  { value: "Furniture", label: "Furniture" },
  { value: "Furniture System", label: "Furniture System" },
  { value: "Lighting", label: "Lighting" },
  { value: "Mass", label: "Mass" },
  { value: "Mechanical", label: "Mechanical" },
  { value: "Openings", label: "Openings" },
  { value: "Pipe", label: "Pipe" },
  { value: "Planting", label: "Planting" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "Profiles", label: "Profiles" },
  { value: "Railings", label: "Railings" },
  { value: "Site", label: "Site" },
  { value: "Specialty Equipment", label: "Specialty Equipment" },
  { value: "Structural Columns", label: "Structural Columns" },
  { value: "Structural Connections", label: "Structural Connections" },
  { value: "Structural Foundations", label: "Structural Foundations" },
  { value: "Structural Framing", label: "Structural Framing" },
  { value: "Structural Rebar Couplers", label: "Structural Rebar Couplers" },
  { value: "Structural Rebar Shapes", label: "Structural Rebar Shapes" },
  {
    value: "Structural Retaining Walls",
    label: "Structural Retaining Walls",
  },
  { value: "Structural Stiffeners", label: "Structural Stiffeners" },
  { value: "Structural Trusses", label: "Structural Trusses" },
  { value: "Sustainable Design", label: "Sustainable Design" },
  { value: "System Families", label: "System Families" },
  { value: "Titleblocks", label: "Titleblocks" },
  { value: "Windows", label: "Windows" },
];

function BimFilterCategory({ handleOnChange, value, handleSubmit }) {
  return (
    <div>
      <Stack
        spacing={3}
        sx={{ pt: 3, pl: 3, backgroundColor: "primary.lighter" }}
      >
        <Stack direction="row">
          <CategoryRoundedIcon
            sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
          />
          <Typography variant="h4" sx={{ color: "primary.main" }}>
            Categories
          </Typography>
        </Stack>
        <Stack>
          <SearchInput handleSubmit={handleSubmit} />
        </Stack>
        <Stack sx={{ height: 600, overflowY: "auto" }}>
          <RadioGroup value={value} onChange={handleOnChange}>
            {CATEGORIES.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: "primary.main" }}
              />
            ))}
          </RadioGroup>
        </Stack>
      </Stack>
    </div>
  );
}

export default BimFilterCategory;
