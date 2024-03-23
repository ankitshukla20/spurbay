import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  res.send("all users");
});

export default router;
