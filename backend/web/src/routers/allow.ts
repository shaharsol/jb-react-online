import { Router } from "express";
import allow from "../middlewares/allow";
import appRouter from './app';

const router = Router()
router.use(allow)
router.use('/', appRouter)


export default router