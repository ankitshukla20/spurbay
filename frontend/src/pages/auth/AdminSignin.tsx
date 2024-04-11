import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MySnackbar from "../../components/MySnackbar";
import useAdminSignin from "../../hooks/useAdminSignin";
import { SigninBody, signinSchema } from "../../schemas/authSchema";

export default function AdminSignin() {
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
    navigate("/admin");
  };

  const signin = useAdminSignin(onSignin);

  const submitHandler = (data: SigninBody) => {
    signin.mutate(data);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Admin Signin
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
          sx={{ mt: 3, mb: 2 }}
          disabled={signin.isPending}
        >
          {signin.isPending ? "Signing in..." : "Sign In"}
        </Button>

        <Link component={RouterLink} to="/auth" variant="body2">
          Forgot password?
        </Link>
      </Box>

      <MySnackbar check={signin.isError} severity="error">
        {signin.error?.response?.data.error}
      </MySnackbar>
    </>
  );
}
