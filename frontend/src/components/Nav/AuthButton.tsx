import { Button } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: ReactNode;
}

export default function AuthButton({ to, children }: Props) {
  return (
    <Button
      variant="outlined"
      disableElevation
      color="inherit"
      sx={{ borderRadius: 2, textTransform: "none", mr: 1 }}
      component={Link}
      to={to}
    >
      {children}
    </Button>
  );
}
