import { Router } from 'express';
import { getUrl, postShortUrl } from "../controllers/url.controllers.js";
import { validateToken } from "../middlewares/auth.middlewares.js";
import { shortenValidate, validateUrlId } from "../middlewares/url.middlewares.js";


const router = Router();

router.post("/urls/shorten", shortenValidate,validateToken,postShortUrl);
router.get("/urls/:id",validateUrlId,getUrl);


export default router;