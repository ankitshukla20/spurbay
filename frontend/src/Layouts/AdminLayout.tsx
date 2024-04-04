import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";

const drawerWidth = 240;

export default function AdminLayout() {
  return (
    <Box display={"flex"}>
      <AdminDashboard />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
