import express, { json, Router } from 'express'
import config from 'config'
import notFound from './middlewares/not-found';
import errorHandler from './middlewares/error/error-handler';
import commentsRouter from './routers/comments';
import followsRouter from './routers/follows';
import postsRouter from './routers/posts';
import feedRouter from './routers/feed';
import authRouter from './routers/auth';
import allowRouter from './routers/allow';
import delayRouter from './routers/delay';
import delayAllowRouter from './routers/delay-allow';

import { Sequelize } from "sequelize-typescript";
import cors from 'cors'
import authBearerParser from 'auth-bearer-parser';
import auth from './middlewares/auth';
import delay from './middlewares/delay';
import allow from './middlewares/allow';
import socket from './middlewares/socket';

const app = express();

const sequelize = new Sequelize({
    ...config.get('postgres'),
    models: [__dirname + '/models']
});
sequelize.sync()

app.use(cors())
app.use(json())
app.use(socket)

// app.use(/.*allow.*/gm, allow)
// app.use(/.*delay.*/gm, delay)
app.use('/allow', allowRouter)
app.use('/delay/allow', delayAllowRouter)

// all /allow routers should be before the auth middlewares
app.use('/auth', authRouter)
// app.use('/delay/auth', delay, authRouter)
// app.use('/delay/allow/auth', delay, authRouter)

app.use(authBearerParser({isThrowError: true}))
app.use(auth)
app.use('/delay', delayRouter)

app.use('/comments', commentsRouter)
app.use('/profile', postsRouter)
app.use('/follows', followsRouter)
app.use('/feed', feedRouter)

app.use(notFound)

app.use(errorHandler)

export default app;

