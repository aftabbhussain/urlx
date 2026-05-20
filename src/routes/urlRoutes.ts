import { Router } from "express"; 
import { shortenUrl, redirectUrl } from "../controllers/urlController";
import { getAnalytics } from "../controllers/analyticsController";
import { rateLimiter } from "../middleware/rateLimiter";
import { requireAuth } from "../middleware/auth";
const router = Router();

router.post('/shorten',rateLimiter, shortenUrl);
router.get('/:shortId', redirectUrl);
router.get('/analytics/:shortId', requireAuth, getAnalytics);

export default router;