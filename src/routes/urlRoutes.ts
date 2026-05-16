import { Router } from "express"; 
import { shortenUrl, redirectUrl } from "../controllers/urlController";
import { getAnalytics } from "../controllers/analyticsController";
import { rateLimiter } from "../middleware/rateLimiter";
const router = Router();

router.post('/shorten',rateLimiter, shortenUrl);
router.get('/:shortId', redirectUrl);
router.get('/analytics/:shortId', getAnalytics);

export default router;