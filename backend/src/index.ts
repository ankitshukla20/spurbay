import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRouter from "./routes/products";
import adminRouter from "./routes/admin";
import adminAuthRouter from "./routes/adminAuth";
import userAuthRouter from "./routes/userAuth";
import userRouter from "./routes/user";
import { authenticateAdmin } from "./middlewares/authenticate";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

/* ---- Middlewares ---- */

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.json());

/* ---- Route handlers ---- */

app.get("/", (req, res) => {
  res.json({ message: "Hello from the Server of Spurbayfashions" });
});

app.use("/api/products", productRouter);
app.use("/api/auth/admin", adminAuthRouter);
app.use("/api/admin", authenticateAdmin, adminRouter);
app.use("/api/auth/user", userAuthRouter);
app.use("/api/user", userRouter);

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
