import { Box, List, Divider } from "@mui/material";
import SideAuthButton from "./SideAuthButton";
import SidebarNavButton from "./SidebarNavButton";

interface Props {
  onCLick: () => void;
}

export default function NotUserDrawerItems({ onCLick }: Props) {
  return (
    <Box>
      <List>
        <SidebarNavButton to="/" onClick={onCLick}>
          Home
        </SidebarNavButton>

        <SidebarNavButton to="/shop" onClick={onCLick}>
          Shop
        </SidebarNavButton>

        <Divider sx={{ my: 2, mx: 4 }} />

        <SideAuthButton to="/auth" onClick={onCLick}>
          Signin
        </SideAuthButton>

        <SideAuthButton to="/auth/register" onClick={onCLick}>
          Signup
        </SideAuthButton>
      </List>
    </Box>
  );
}
