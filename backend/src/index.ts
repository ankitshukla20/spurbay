import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import createHttpError, { isHttpError } from "http-errors";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import productRouter from "./routes/products";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

/* ---- Middlewares ---- */

app.use(express.json());

/* ---- Route handlers ---- */

app.get("/", (req, res) => {
  res.json({ message: "Hello from the Server of Spurbayfashions" });
});

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/products", productRouter);

/* ---- Error handling middlewares ---- */

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  if (isHttpError(err)) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
