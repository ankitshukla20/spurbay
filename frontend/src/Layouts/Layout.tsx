import { Outlet } from "react-router-dom";
import MyAppBar from "../components/MyAppBar";
import { Container } from "@mui/material";

export default function Layout() {
  return (
    <>
      <MyAppBar />
      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}
