import { Drawer } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  handleDrawer: () => void;
  children: ReactNode;
}

export default function MyDrawer({ open, handleDrawer, children }: Props) {
  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawer}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: "block",
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {children}
      </Drawer>
    </>
  );
}
