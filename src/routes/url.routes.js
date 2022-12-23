import { Router } from 'express';
import { postShortUrl } from "../controllers/url.controllers.js";
import { validateToken } from "../middlewares/auth.middlewares.js";
import { shortenValidate } from "../middlewares/url.middlewares.js";


const router = Router();

router.post("/urls/shorten", shortenValidate,validateToken,postShortUrl);


export default router;