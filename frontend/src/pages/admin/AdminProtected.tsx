import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: { xs: "50px", md: "100px" }, // Adjust margin based on screen size
        mx: "auto", // Center align horizontally
        maxWidth: "600px", // Limit maximum width
        padding: "0 20px", // Add padding on smaller screens
      }}
    >
      <Typography
        variant="h1"
        gutterBottom
        sx={{
          fontSize: { xs: "3rem", md: "4rem", textTransform: "uppercase" },
        }}
      >
        401 Unauthorized
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
      >
        To access admin functionalities, login with an admin's credentials.
      </Typography>
      <Button
        variant="text"
        disableElevation
        color="primary"
        component={Link}
        to="/auth/admin/"
        sx={{ mt: 2, fontSize: "1rem", textTransform: "none" }} // Add margin top and adjust font size
      >
        Signin as Admin
      </Button>
    </Box>
  );
}
