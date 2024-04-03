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

interface Props {
  user: User;
  toggleMenu: () => void;
}

export default function UserDrawerItems({ user, toggleMenu }: Props) {
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
      <Divider sx={{ mt: 2, mb: 1, mx: 1 }} />

      <List>
        <SidebarNavButton to="/" onClick={toggleMenu}>
          Home
        </SidebarNavButton>

        <SidebarNavButton to="/shop" onClick={toggleMenu}>
          Shop
        </SidebarNavButton>

        <Divider sx={{ my: 1, mx: 4 }} />

        <SidebarNavButton to="/orders" onClick={toggleMenu}>
          Orders
        </SidebarNavButton>

        <SidebarNavButton to="/profile" onClick={toggleMenu}>
          Profile
        </SidebarNavButton>

        <Divider sx={{ my: 1, mx: 4 }} />

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
            onClick={() => {
              toggleMenu();
              console.log("Logout");
            }}
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
