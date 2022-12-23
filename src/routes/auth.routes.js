import { postSignIn, postSignUp } from "../controllers/auth.controllers.js";
import { Router } from 'express';
import { signInValidations, signUpValidations } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/signup",signUpValidations,postSignUp);
router.post("/signin",signInValidations,postSignIn);

export default router;