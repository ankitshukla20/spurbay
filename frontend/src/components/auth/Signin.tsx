import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useSignin from "../../hooks/useSignin";
import { SigninBody, signinSchema } from "../../schemas/authSchema";
import { useEffect, useState } from "react";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SigninBody>({
    resolver: zodResolver(signinSchema),
  });

  const navigate = useNavigate();

  const onSignin = () => {
    reset();
    navigate("/");
  };

  const signin = useSignin(onSignin);

  const submitHandler = async (data: SigninBody) => {
    signin.mutate(data);
  };

  // Snackbar Logic
  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  useEffect(() => {
    if (signin.isError) setOpen(true);
  }, [signin.isError]);

  // Return
  return (
    <>
      <Typography component="h1" variant="h5">
        Welcome Back!
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        sx={{ my: 4, mx: 6 }}
      >
        <TextField
          fullWidth
          label="Email Address"
          autoFocus
          {...register("email")}
        />
        {errors.email && (
          <Typography variant="caption" color="error">
            {errors.email.message}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mt: 2 }}
          {...register("password")}
        />
        {errors.password && (
          <Typography variant="caption" color="error">
            {errors.password.message}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
          disabled={signin.isPending}
        >
          {signin.isPending ? "Signing in..." : "Sign In"}
        </Button>

        <Grid container gap={1} sx={{ mt: 3 }}>
          <Grid item xs>
            <Link component={RouterLink} to="/auth" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/auth/register" variant="body2">
              Don't have an account?
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          {signin.error?.response?.data.error}
        </Alert>
      </Snackbar>
    </>
  );
}
