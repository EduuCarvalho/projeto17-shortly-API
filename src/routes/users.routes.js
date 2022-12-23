import { postSignUp } from "../controllers/users.controllers.js";
import { Router } from 'express';
import { signUpValidations } from "../middlewares/users.middlewares.js";

const router = Router();

router.post("/signup",signUpValidations,postSignUp);

export default router;