import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8 }}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Spurbay Fashions
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
