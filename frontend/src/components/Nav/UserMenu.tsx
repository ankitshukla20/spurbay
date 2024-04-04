import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import useUserLogout from "../../hooks/useUserLogout";
import { User } from "../../store";

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
        elevation={2}
        sx={{ mt: 4.5 }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem sx={{ px: 4 }} onClick={handleClose}>
          Orders
        </MenuItem>

        <MenuItem sx={{ px: 4 }} onClick={handleClose} divider>
          Profile
        </MenuItem>

        <MenuItem sx={{ px: 4 }} onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
