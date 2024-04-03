import { Button } from "@mui/material";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  to: string;
  children: ReactNode;
}

export default function NavButton({ to, children }: Props) {
  const location = useLocation();

  return (
    <Button
      sx={{
        mx: 1,
        color: location.pathname === to ? "primary.main" : "grey",
      }}
      component={Link}
      to={to}
    >
      {children}
    </Button>
  );
}
