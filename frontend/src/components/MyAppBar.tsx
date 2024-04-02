import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import {
  AppBar,
  Badge,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MyAppBar() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const drawer = (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",
              color: location.pathname === "/" ? "primary.main" : "inherit",
            }}
            onClick={toggleMenu}
            component={Link}
            to="/"
          >
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",
              color: location.pathname === "/shop" ? "primary.main" : "inherit",
            }}
            onClick={toggleMenu}
            component={Link}
            to="/shop"
          >
            <ListItemText primary={"Shop"} />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ mt: 1, mb: 3 }} />

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              bgcolor: "primary.light",
              color: "primary.contrastText",
              textAlign: "center",
              border: 1,
              borderRadius: 2,
              mx: 3,
              my: 1,
            }}
            onClick={toggleMenu}
          >
            <ListItemText primary="Signin" />
          </ListItemButton>
        </ListItem>

        <ListItemButton
          sx={{
            bgcolor: "primary.light",
            color: "primary.contrastText",
            textAlign: "center",
            border: 1,
            borderRadius: 2,
            mx: 3,
            my: 1,
          }}
          onClick={toggleMenu}
        >
          <ListItemText primary="Signup" />
        </ListItemButton>
      </List>
    </>
  );

  // For smaller screen
  if (isMobile) {
    // Not signed in
    return (
      <AppBar position="static" elevation={1} color="transparent">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <IconButton color="inherit" onClick={toggleMenu}>
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="left"
                open={menuOpen}
                onClose={toggleMenu}
                variant="temporary"
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: "block",
                  "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
                }}
              >
                {drawer}
              </Drawer>
            </Grid>

            <Grid item xs={8} textAlign="center">
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  color="primary.main"
                  fontSize={28}
                  fontFamily="Dancing Script, cursive"
                >
                  Spurbay
                </Typography>
              </Link>
            </Grid>

            <Grid item xs={2} textAlign="right">
              <IconButton color="inherit">
                <Badge badgeContent={2} color="primary">
                  <ShoppingBasketRoundedIcon />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }

  // For big screen
  return (
    // Not signed in
    <>
      <AppBar position="static" elevation={1} color="transparent">
        <Toolbar>
          <Grid container>
            <Grid item md={3}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  color="primary.main"
                  fontSize={28}
                  fontFamily="Dancing Script, cursive"
                >
                  Spurbay
                </Typography>
              </Link>
            </Grid>

            <Grid item md={6} textAlign="center">
              <Button
                sx={{
                  mx: 1,
                  color: location.pathname === "/" ? "primary.main" : "grey",
                }}
                component={Link}
                to="/"
              >
                Home
              </Button>
              <Button
                sx={{
                  mx: 1,
                  color:
                    location.pathname === "/shop" ? "primary.main" : "grey",
                }}
                component={Link}
                to="/shop"
              >
                Shop
              </Button>
            </Grid>

            <Grid item md={3} textAlign="right">
              <Button
                variant="outlined"
                disableElevation
                color="inherit"
                sx={{ borderRadius: 2, textTransform: "none" }}
              >
                Signup
              </Button>
              <Button
                variant="outlined"
                disableElevation
                color="inherit"
                sx={{ borderRadius: 2, textTransform: "none", mx: 1 }}
              >
                Signin
              </Button>
              <IconButton color="inherit">
                <Badge badgeContent={2} color="primary">
                  <ShoppingBasketRoundedIcon />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
