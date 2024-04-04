import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { User } from "../../store";
import SidebarNavButton from "./SidebarNavButton";
import useUserLogout from "../../hooks/useUserLogout";

interface Props {
  user: User;
  onClick: () => void;
}

export default function UserDrawerItems({ user, onClick }: Props) {
  const logout = useUserLogout();
  const handleLogout = () => {
    logout.mutate();
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
