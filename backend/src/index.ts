import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Hello from server of Spurbayfashions" });
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
