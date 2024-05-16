import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Badge, Grid, IconButton, Toolbar } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { HttpError } from "../services/http-error";
import { userState } from "../store";
import AuthButton from "./Nav/AuthButton";
import CompanyName from "./CompanyName";
import MyDrawer from "./Nav/MyDrawer";
import MySwipableDrawer from "./Nav/MySwipableDrawer";
import NavButton from "./Nav/NavButton";
import NotUserDrawerItems from "./Nav/NotUserDrawerItems";
import UserDrawerItems from "./Nav/UserDrawerItems";
import UserMenu from "./Nav/UserMenu";
import { LogoutResponse } from "../hooks/useUserLogout";

interface Props {
  logoutFn: UseMutateFunction<LogoutResponse, HttpError, void, unknown>;
}

export default function MyAppBar({ logoutFn }: Props) {
  const user = useRecoilValue(userState);

  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const [swipebar, setSwipebar] = useState(false);
  const toggleSwipebar = () => {
    setSwipebar(!swipebar);
  };

  return (
    <>
      {/* For Window Screen */}
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          display: { xs: "none", md: "block" },
        }}
      >
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item md={3}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <CompanyName />
              </Link>
            </Grid>

            <Grid item md={6} textAlign="center">
              <NavButton to="/">Home</NavButton>
              <NavButton to="/shop">Shop</NavButton>
            </Grid>

            <Grid item md={3} textAlign="right">
              {user ? (
                <UserMenu user={user} logoutFn={logoutFn} />
              ) : (
                <>
                  <AuthButton to="/auth/register">Signup</AuthButton>
                  <AuthButton to="/auth">Signin</AuthButton>
                </>
              )}

              <IconButton color="inherit">
                <Badge badgeContent={2} color="primary">
                  <LocalMallRoundedIcon />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* For Smaller screen */}
      <MySwipableDrawer
        open={swipebar}
        onOpen={() => setSwipebar(true)}
        onClose={() => setSwipebar(false)}
      >
        {user ? (
          <UserDrawerItems
            user={user}
            logoutFn={logoutFn}
            onClick={toggleSwipebar}
          />
        ) : (
          <NotUserDrawerItems onCLick={toggleSwipebar} />
        )}
      </MySwipableDrawer>

      <AppBar
        position="static"
        elevation={1}
        color="transparent"
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <IconButton color="inherit" onClick={toggleSidebar}>
                <MenuIcon />
              </IconButton>

              <MyDrawer open={sidebar} handleDrawer={toggleSidebar}>
                {user ? (
                  <UserDrawerItems
                    user={user}
                    logoutFn={logoutFn}
                    onClick={toggleSidebar}
                  />
                ) : (
                  <NotUserDrawerItems onCLick={toggleSidebar} />
                )}
              </MyDrawer>
            </Grid>

            <Grid item xs={8} textAlign="center">
              <Link to="/" style={{ textDecoration: "none" }}>
                <CompanyName />
              </Link>
            </Grid>

            <Grid item xs={2} textAlign="right">
              <IconButton color="inherit">
                <Badge badgeContent={2} color="primary">
                  <LocalMallRoundedIcon />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
