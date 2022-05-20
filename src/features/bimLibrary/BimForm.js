import React, { useCallback, useRef } from "react";
import {
  FormProvider,
  FSelect,
  FTextField,
  FUploadImage,
} from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { createBim } from "./bimLibSlice";

const yupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const defaultValues = {
  name: "",
  imageUrl: "",
  fileUrl: "",
  type: "Annotations",
};

function BimForm() {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.bimLib);

  const fileInput = useRef();

  const onSubmit = (data) => {
    dispatch(createBim(data)).then(() => reset());
  };

  const handleFile = (e) => {
    const file = fileInput.current.files[0];
    if (file) {
      setValue("fileUrl", file);
    }
  };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "imageUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const CATEGORIES = [
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={5}>
        <Stack spacing={2}>
          <FTextField
            name="name"
            variant="standard"
            placeholder="Name of BIM model"
          />
          <FSelect name="type" variant="standard">
            {CATEGORIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FSelect>

          <input type="file" ref={fileInput} onChange={handleFile} />
        </Stack>
        <Stack>
          <FUploadImage
            name="imageUrl"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />
        </Stack>
      </Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingTop: "10px",
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          color="success"
          sx={{ boxShadow: "none" }}
          loading={isSubmitting || isLoading}
        >
          Create
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}

export default BimForm;
