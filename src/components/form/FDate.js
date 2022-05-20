import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";

function FDate({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          label="Set due date"
          minDate={new Date()}
          renderInput={(params) => (
            <TextField name="duedate" variant="standard" {...params} />
          )}
          {...other}
        />
      )}
    />
  );
}

export default FDate;
