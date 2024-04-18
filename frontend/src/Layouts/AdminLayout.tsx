import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import AdminDashboard from "../components/AdminDashboard";
import useAdminLogout from "../hooks/useAdminLogout";
import useGetAdmin from "../hooks/useGetAdmin";
import { adminState } from "../store";
import AdminProtected from "../pages/admin/AdminProtected";
import { grey } from "@mui/material/colors";

const drawerWidth = 240;

export default function AdminLayout() {
  const [admin, setAdmin] = useRecoilState(adminState);
  const { data } = useGetAdmin();

  useEffect(() => {
    if (data) {
      setAdmin(data);
    }
  }, [data]);

  const logout = useAdminLogout();

  return (
    <Box display={"flex"}>
      <AdminDashboard drawerWidth={drawerWidth} logoutFn={logout.mutate} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: grey[50],
          minHeight: "100vh",
        }}
      >
        {admin ? <Outlet /> : <AdminProtected />}
      </Box>
    </Box>
  );
}
