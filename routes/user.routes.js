import express from "express";
import {
  forgotPassword,
  listAllUsers,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/list-all-users", listAllUsers);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword", resetPassword);

export default router;
