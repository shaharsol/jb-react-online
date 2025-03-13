import { Router } from "express";
import commentsRouter from './comments';
import followsRouter from './follows';
import postsRouter from './posts';
import feedRouter from './feed';
import authRouter from './auth';
import auth from "../middlewares/auth";
import authBearerParser from "auth-bearer-parser";

const router = Router()
router.use('/auth', authRouter)

router.use(authBearerParser({isThrowError: true}))
router.use(auth)

router.use('/comments', commentsRouter)
router.use('/profile', postsRouter)
router.use('/follows', followsRouter)
router.use('/feed', feedRouter)

export default router