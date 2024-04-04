import { Alert, Snackbar } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  check: boolean;
  severity: "error" | "info" | "success" | "warning";
  children: ReactNode;
}

export default function MySnackbar({ check, severity, children }: Props) {
  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  useEffect(() => {
    if (check) setOpen(true);
  }, [check]);

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={severity}
      >
        {children}
      </Alert>
    </Snackbar>
  );
}
