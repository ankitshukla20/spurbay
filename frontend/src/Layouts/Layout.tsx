import { Outlet } from "react-router-dom";
import MyAppBar from "../components/MyAppBar";

export default function Layout() {
  return (
    <>
      <MyAppBar />
      <Outlet />
    </>
  );
}
