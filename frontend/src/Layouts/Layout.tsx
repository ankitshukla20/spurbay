import { Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import MySnackbar from "../components/MySnackbar";
import MyAppBar from "../components/MyAppBar";
import useGetUser from "../hooks/useGetUser";
import useUserLogout from "../hooks/useUserLogout";
import { userState } from "../store";

export default function Layout() {
  const setUser = useSetRecoilState(userState);
  const { data } = useGetUser();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const logout = useUserLogout();

  return (
    <>
      <MyAppBar logoutFn={logout.mutate} />

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Outlet />
      </Container>

      <MySnackbar check={logout.isSuccess} severity="success">
        {logout.data?.message}
      </MySnackbar>
    </>
  );
}
