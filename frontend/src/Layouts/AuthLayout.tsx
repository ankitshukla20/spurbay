import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Outlet } from "react-router-dom";
import Copyright from "../components/auth/Copyright";

export default function AuthLayout() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        sx={{
          backgroundColor: { xs: "#fff", md: deepOrange[50] },
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Paper
            elevation={isSmallScreen ? 0 : 2}
            sx={{
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 420,
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Outlet />
          </Paper>
          <Copyright />
        </Box>
      </Box>
    </>
  );
}
