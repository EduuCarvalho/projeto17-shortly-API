import { Router } from "express";
import { usersDataByToken } from "../controllers/user.controllers.js";
import { validateToken } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/users/me",validateToken,usersDataByToken)

export default router;
