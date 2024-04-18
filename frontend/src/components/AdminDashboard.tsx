import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
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
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LogoutResponse } from "../hooks/useUserLogout";
import { HttpError } from "../services/http-error";
import { adminState } from "../store";
import SideAuthButton from "./Nav/SideAuthButton";
import SidebarNavButton from "./Nav/SidebarNavButton";

interface Props {
  drawerWidth: number;
  logoutFn: UseMutateFunction<LogoutResponse, HttpError, void, unknown>;
}

export default function Dashboard({ drawerWidth, logoutFn }: Props) {
  const admin = useRecoilValue(adminState);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleListItemClick = () => {
    setMobileOpen(false); // Close the drawer when a list item is clicked
  };

  const handleLogout = () => {
    logoutFn();
    navigate("/admin");
  };

  const drawer = (
    <Box>
      <Typography textAlign="center" color="inherit" variant="h6" sx={{ m: 3 }}>
        Admin Dashboard
      </Typography>
      <Divider sx={{ mt: 2, mb: 1, mx: 1 }} />

      <List>
        <SidebarNavButton
          to="/admin"
          Icon={BarChartRoundedIcon}
          onClick={handleListItemClick}
        >
          Analytics
        </SidebarNavButton>

        <SidebarNavButton
          to="/admin/new-product"
          Icon={AddCircleOutlineRoundedIcon}
          onClick={handleListItemClick}
        >
          New Product
        </SidebarNavButton>

        <SidebarNavButton
          to="/admin/p"
          Icon={AppsRoundedIcon}
          onClick={handleListItemClick}
        >
          Products
        </SidebarNavButton>

        <SidebarNavButton
          to="/admin/o"
          Icon={ReceiptRoundedIcon}
          onClick={handleListItemClick}
        >
          Orders
        </SidebarNavButton>

        <SidebarNavButton
          to="/admin/u"
          Icon={PeopleAltRoundedIcon}
          onClick={handleListItemClick}
        >
          Users
        </SidebarNavButton>

        <SidebarNavButton
          to="/admin/r"
          Icon={StarRoundedIcon}
          onClick={handleListItemClick}
        >
          Reviews
        </SidebarNavButton>

        <Divider sx={{ my: 1, mx: 4 }} />

        {admin ? (
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                color: "inherit",
                textAlign: "center",
                border: 1,
                borderRadius: 2,
                mt: 3,
                mx: 4,
              }}
              onClick={handleLogout}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <SideAuthButton to="/auth/admin" onClick={handleListItemClick}>
            Signin
          </SideAuthButton>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
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
            display: { xs: "block", md: "none" },
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
            display: { xs: "none", md: "block" },
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
