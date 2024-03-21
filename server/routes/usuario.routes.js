import { Router } from "express";
import { login,register,getUserById } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
const router=Router()

router.get("/user", verifyToken, getUserById);
router.post("/register", register);
router.post("/login", login);

export default router