import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { SignupBody, signupSchema } from "../../schemas/authSchema";
import MySnackbar from "../MySnackbar";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupBody>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const onSignup = () => {
    reset();
    navigate("/");
  };

  const signup = useSignup(onSignup);

  const submitHandler = (data: SignupBody) => {
    signup.mutate(data);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Create an account
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        sx={{ my: 4, mx: 6 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              autoFocus
              {...register("firstname")}
            />
            {errors.firstname && (
              <Typography variant="caption" color="error">
                {errors.firstname.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name" {...register("lastname")} />
            {errors.lastname && (
              <Typography variant="caption" color="error">
                {errors.lastname.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email Address" {...register("email")} />
            {errors.email && (
              <Typography variant="caption" color="error">
                {errors.email.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <Typography variant="caption" color="error">
                {errors.password.message}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
        >
          Sign Up
        </Button>

        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Link component={RouterLink} to="/auth" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>

      <MySnackbar check={signup.isError} severity="error">
        {signup.error?.response?.data.error}
      </MySnackbar>
    </>
  );
}
