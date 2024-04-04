import { Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import MyAppBar from "../components/Nav/MyAppBar";
import useGetUser from "../hooks/useGetUser";
import { userState } from "../store";

export default function Layout() {
  const setUser = useSetRecoilState(userState);
  const { data } = useGetUser();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <>
      <MyAppBar />

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}
