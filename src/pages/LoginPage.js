import React, { useState } from "react";

import { FCheckbox, FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../hooks/useAuth";

import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import Logo from "../components/Logo";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LoginPage() {
  const auth = useAuth();
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    let { email, password } = data;
    try {
      await auth.login({ email, password }, (path) => {
        navigate(path, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            padding: 6,
            backgroundColor: "#FFCB05",
            boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px",
          }}
        >
          <Stack spacing={1.5}>
            <Logo sx={{ width: 180, mb: 1 }} />
            <Typography sx={{ fontSize: "24px", mb: "10px" }}>
              Sign in
            </Typography>
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.message}</Alert>
            )}
            {/* <Alert severity="info">
              Don't have an account?{" "}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Alert> */}
            <FTextField
              name="email"
              placeholder="Email address"
              variant="standard"
            />
            <FTextField
              name="password"
              placeholder="Password"
              variant="standard"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ mb: 5 }} />
            <Stack direction="row">
              <Typography sx={{ mr: "5px" }}>No account?</Typography>
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Create one!
              </Link>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FCheckbox name="remember" label="Remember me" />
          </Stack>
          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              // fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Sign in
            </LoadingButton>
          </Stack>
        </Card>
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
