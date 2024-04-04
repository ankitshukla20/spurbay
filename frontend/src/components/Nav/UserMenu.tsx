import { Button, Menu, MenuItem, Divider, Tooltip } from "@mui/material";
import { useState } from "react";
import { User } from "../../store";
import useUserLogout from "../../hooks/useUserLogout";

interface Props {
  user: User;
}

export default function UserMenu({ user }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = useUserLogout();
  const handleLogout = () => {
    logout.mutate();
    handleClose();
  };

  return (
    <>
      <Tooltip title="User Menu">
        <Button
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          sx={{
            mx: 1,
            px: 2,
            textTransform: "none",
            border: anchorEl ? 1 : 0,
          }}
        >
          Hello {user.firstname} ▾
        </Button>
      </Tooltip>

      <Menu
        sx={{ mt: 4.5 }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem sx={{ px: 4 }} onClick={handleClose}>
          Orders
        </MenuItem>

        <MenuItem sx={{ px: 4 }} onClick={handleClose}>
          Profile
        </MenuItem>

        <Divider sx={{ m: 0, p: 0 }} />

        <MenuItem sx={{ px: 4 }} onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
