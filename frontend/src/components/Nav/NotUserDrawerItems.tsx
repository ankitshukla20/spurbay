import { Box, List, Divider } from "@mui/material";
import SideAuthButton from "./SideAuthButton";
import SidebarNavButton from "./SidebarNavButton";

interface Props {
  toggleMenu: () => void;
}

export default function NotUserDrawerItems({ toggleMenu }: Props) {
  return (
    <Box>
      <List>
        <SidebarNavButton to="/" onClick={toggleMenu}>
          Home
        </SidebarNavButton>

        <SidebarNavButton to="/shop" onClick={toggleMenu}>
          Shop
        </SidebarNavButton>

        <Divider sx={{ my: 2, mx: 4 }} />

        <SideAuthButton to="/auth" onClick={toggleMenu}>
          Signin
        </SideAuthButton>

        <SideAuthButton to="/auth/register" onClick={toggleMenu}>
          Signup
        </SideAuthButton>
      </List>
    </Box>
  );
}
