import { Router } from "express";
import { getUserFeed } from "../controllers/feed/controller";

const router = Router();

router.get('/', getUserFeed)

export default router;