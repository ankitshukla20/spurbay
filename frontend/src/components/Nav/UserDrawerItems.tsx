import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { LogoutResponse } from "../../hooks/useUserLogout";
import { HttpError } from "../../services/http-error";
import { User } from "../../store";
import SidebarNavButton from "./SidebarNavButton";

interface Props {
  user: User;
  onClick: () => void;
  logoutFn: UseMutateFunction<LogoutResponse, HttpError, void, unknown>;
}

export default function UserDrawerItems({ user, onClick, logoutFn }: Props) {
  const handleLogout = () => {
    logoutFn();
    onClick();
  };

  return (
    <Box>
      <Typography
        textAlign="center"
        color="inherit"
        variant="h6"
        sx={{ px: 2, pt: 2 }}
      >
        Hello {user?.firstname}
      </Typography>
      <Divider sx={{ mt: 2, mb: 1, mx: 3 }} />

      <List>
        <SidebarNavButton to="/" onClick={onClick}>
          Home
        </SidebarNavButton>

        <SidebarNavButton to="/shop" onClick={onClick}>
          Shop
        </SidebarNavButton>

        <Divider sx={{ my: 1, mx: 6 }} />

        <SidebarNavButton to="/orders" onClick={onClick}>
          Orders
        </SidebarNavButton>

        <SidebarNavButton to="/profile" onClick={onClick}>
          Profile
        </SidebarNavButton>

        <Divider sx={{ my: 1, mx: 6 }} />

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              color: "inherit",
              textAlign: "center",
              border: 1,
              borderRadius: 2,
              mx: 6,
              mt: 3,
            }}
            onClick={handleLogout}
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
