import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createTask } from "./taskSlice";
import { getAllData } from "../staff/staffSlice";
import { FormProvider, FSelect, FTextField } from "../../components/form";

import FDate from "../../components/form/FDate";

const yupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  duedate: Yup.string().required("Due date is required"),
});

const defaultValues = {
  name: "",
  detail: "",
  assignee: "",
  duedate: null,
};

function TaskForm() {
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
  const { isLoading } = useSelector((state) => state.task);

  const onSubmit = (data) => {
    dispatch(createTask(data)).then(() => reset());
  };

  const { staffList } = useSelector((state) => state.staff);

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  useEffect(() => {
    reset({
      name: "",
      detail: "",
      assignee: staffList[0],
      duedate: null,
    });
  }, [staffList]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FTextField
          name="name"
          placeholder="Enter a task name"
          variant="standard"
        />
        <FTextField
          name="detail"
          placeholder="Description"
          variant="standard"
          multiline
          rows={3}
        />
        <FDate name="duedate" />
        <FSelect
          name="assignee"
          // label="Assignee"
          variant="standard"
          inputProps={{ "aria-label": "Without label" }}
        >
          {staffList.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name} - {option.email}
            </option>
          ))}
        </FSelect>

        <LoadingButton
          type="submit"
          variant="contained"
          size="small"
          loading={isSubmitting || isLoading}
          sx={{
            boxShadow: "none",
            backgroundColor: "#FFCB05",
            "&:hover": {
              backgroundColor: "#404040",
              color: "#FFCB05",
            },
            color: "primary.main",
          }}
        >
          <Typography>Add task</Typography>
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

export default TaskForm;
