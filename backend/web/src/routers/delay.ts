import { Router } from "express";
import delay from "../middlewares/delay";
import allowRouter from './allow';
import appRouter from './app';

const router = Router()
router.use(delay)
router.use('/allow', allowRouter)
router.use('/', appRouter)
export default router