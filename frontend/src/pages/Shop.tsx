import { TextField, Typography } from "@mui/material";

export default function Shop() {
  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 5 }} gutterBottom>
        Shop
      </Typography>
      <TextField
        placeholder="Search"
        autoComplete=""
        InputProps={{
          style: {
            borderRadius: "10px",
          },
        }}
      />
    </>
  );
}
