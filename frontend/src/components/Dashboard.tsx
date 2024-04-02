import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleListItemClick = () => {
    setMobileOpen(false); // Close the drawer when a list item is clicked
  };

  const drawer = (
    <Box>
      <Typography
        variant="h6"
        component="div"
        sx={{ textAlign: "center", px: 2, pt: 2 }}
      >
        Admin Dashboard
      </Typography>
      <Divider sx={{ mt: 2, mb: 1, mx: 2 }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleListItemClick}
            component={Link}
            to="/admin"
            sx={{
              color:
                location.pathname === "/admin" ? "primary.main" : "inherit",
            }}
          >
            {/* <ListItemIcon>
        {icon}
      </ListItemIcon> */}
            <ListItemText primary={"Analytics"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleListItemClick}
            component={Link}
            to="/admin"
            sx={{
              color:
                location.pathname === "/admin" ? "primary.main" : "inherit",
            }}
          >
            {/* <ListItemIcon>
        {icon}
      </ListItemIcon> */}
            <ListItemText primary={"New Product"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleListItemClick}
            component={Link}
            to="/admin"
            sx={{
              color:
                location.pathname === "/admin" ? "primary.main" : "inherit",
            }}
          >
            {/* <ListItemIcon>
        {icon}
      </ListItemIcon> */}
            <ListItemText primary={"Products"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleListItemClick}
            component={Link}
            to="/admin"
            sx={{
              color:
                location.pathname === "/admin" ? "primary.main" : "inherit",
            }}
          >
            {/* <ListItemIcon>
        {icon}
      </ListItemIcon> */}
            <ListItemText primary={"Orders"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleListItemClick}
            component={Link}
            to="/admin"
            sx={{
              color:
                location.pathname === "/admin" ? "primary.main" : "inherit",
            }}
          >
            {/* <ListItemIcon>
        {icon}
      </ListItemIcon> */}
            <ListItemText primary={"Users"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleListItemClick}
            component={Link}
            to="/admin"
            sx={{
              color:
                location.pathname === "/admin" ? "primary.main" : "inherit",
            }}
          >
            {/* <ListItemIcon>
        {icon}
      </ListItemIcon> */}
            <ListItemText primary={"Reviews"} />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 1, mx: 4 }} />

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              color: "inherit",
              textAlign: "center",
              border: 1,
              borderRadius: 2,
              mx: 3,
              my: 2,
            }}
            component={Link}
            to="/"
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <SwipeableDrawer
          variant="temporary"
          open={mobileOpen}
          onOpen={() => setMobileOpen(true)}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
