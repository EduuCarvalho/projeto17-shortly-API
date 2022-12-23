import { Router } from 'express';
import { deleteUrlById, getRedirectUrl, getUrl, postShortUrl } from "../controllers/url.controllers.js";
import { validateToken } from "../middlewares/auth.middlewares.js";
import { shortenValidate, validateRedirectUrl, validateUrlId } from "../middlewares/url.middlewares.js";


const router = Router();

router.post("/urls/shorten", shortenValidate,validateToken,postShortUrl);
router.get("/urls/:id",validateUrlId,getUrl);
router.get("/urls/open/:shortUrl",validateRedirectUrl,getRedirectUrl);
router.delete("/urls/:id",validateUrlId,validateToken,deleteUrlById)


export default router;