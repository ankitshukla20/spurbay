import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { SignupBody, signupSchema } from "../../schemas/authSchema";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupBody>({
    resolver: zodResolver(signupSchema),
  });

  const submitHandler = (data: FieldValues) => {
    console.log(data);
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
            <TextField fullWidth label="Password" {...register("password")} />
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
    </>
  );
}
