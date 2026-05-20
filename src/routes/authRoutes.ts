import { Router } from "express";
import { register, login } from "../controllers/authContoller";
import { rateLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post('/register', rateLimiter, register);
router.post('/login', rateLimiter, login);

export default router;