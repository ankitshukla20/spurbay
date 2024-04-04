import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../store";
import AuthButton from "./AuthButton";
import CompanyName from "./CompanyName";
import MyDrawer from "./MyDrawer";
import NavButton from "./NavButton";
import NotUserDrawerItems from "./NotUserDrawerItems";
import UserDrawerItems from "./UserDrawerItems";
import UserMenu from "./UserMenu";

export default function MyAppBar() {
  const user = useRecoilValue(userState);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  // For Small Screen
  if (isSmallScreen) {
    return (
      <AppBar position="static" elevation={1} color="transparent">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <IconButton color="inherit" onClick={toggleSidebar}>
                <MenuIcon />
              </IconButton>

              <MyDrawer open={sidebar} handleDrawer={toggleSidebar}>
                {user ? (
                  <UserDrawerItems user={user} toggleMenu={toggleSidebar} />
                ) : (
                  <NotUserDrawerItems toggleMenu={toggleSidebar} />
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
    );
  }

  // For Big Screen
  return (
    <>
      <AppBar position="static" elevation={1} color="transparent">
        <Toolbar>
          <Grid container>
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
                <UserMenu user={user} />
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
    </>
  );
}
