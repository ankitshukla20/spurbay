import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRouter from "./routes/products";
import adminAuthRouter from "./routes/adminAuth";
import adminProfileRouter from "./routes/adminProfile";
import adminManageProductRouter from "./routes/adminManageProduct";
import adminManageCategoryRouter from "./routes/adminManageCategories";
import adminManageUserRouter from "./routes/adminManageUser";
import userAuthRouter from "./routes/userAuth";
import userProfileRouter from "./routes/userProfile";
import {
  authenticateAdmin,
  authenticateUser,
} from "./middlewares/authenticate";

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

// Product routes
app.use("/api/products", productRouter);

// Admin routes
app.use("/api/auth/admin", adminAuthRouter);
app.use("/api/admin/me", authenticateAdmin, adminProfileRouter);
app.use("/api/admin/product", authenticateAdmin, adminManageProductRouter);
app.use("/api/admin/categories", authenticateAdmin, adminManageCategoryRouter);
app.use("/api/admin/users", authenticateAdmin, adminManageUserRouter);

// User routes
app.use("/api/auth/user", userAuthRouter);
app.use("/api/user/me", authenticateUser, userProfileRouter);

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
