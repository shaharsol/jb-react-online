import { Router } from "express";
import delay from "../middlewares/delay";
import allow from "../middlewares/allow";
import commentsRouter from './comments';
import followsRouter from './follows';
import postsRouter from './posts';
import feedRouter from './feed';
import authBearerParser from "auth-bearer-parser";
import auth from "../middlewares/auth";

const router = Router()
router.use(delay)
router.use(allow)
router.use(authBearerParser({isThrowError: true}))
router.use(auth)

router.use('/comments', commentsRouter)
router.use('/profile', postsRouter)
router.use('/follows', followsRouter)
router.use('/feed', feedRouter)
export default router