import { Router } from "express"; 
import { shortenUrl, redirectUrl } from "../controllers/urlController";
import { rateLimiter } from "../middleware/rateLimiter";
const router = Router();

router.post('/shorten',rateLimiter, shortenUrl);
router.get('/:shortId', redirectUrl);

export default router;