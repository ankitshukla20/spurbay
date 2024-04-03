import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  onClick: () => void;
  children: ReactNode;
}

export default function SideAuthButton({ to, onClick, children }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          bgcolor: "primary.light",
          color: "primary.contrastText",
          ":hover": { bgcolor: "primary.main" },
          textAlign: "center",
          border: 1,
          borderRadius: 2,
          mx: 3,
          mt: 2,
        }}
        to={to}
        onClick={onClick}
        component={Link}
      >
        <ListItemText primary={children} />
      </ListItemButton>
    </ListItem>
  );
}
