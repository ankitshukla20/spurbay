import { SwipeableDrawer } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
}

export default function MySwipableDrawer({
  open,
  onOpen,
  onClose,
  children,
}: Props) {
  return (
    <SwipeableDrawer
      variant="temporary"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 240,
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  );
}
