import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { HttpError } from "../../services/http-error";
import { User } from "../../store";
import { LogoutResponse } from "../../hooks/useUserLogout";

interface Props {
  user: User;
  logoutFn: UseMutateFunction<LogoutResponse, HttpError, void, unknown>;
}

export default function UserMenu({ user, logoutFn }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutFn();
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
