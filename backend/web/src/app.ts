import config from 'config';
import express, { json } from 'express';
import errorHandler from './middlewares/error/error-handler';
import notFound from './middlewares/not-found';
import allowRouter from './routers/allow';
import appRouter from './routers/app';
import delayRouter from './routers/delay';

import cors from 'cors';
import { Sequelize } from "sequelize-typescript";
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

app.use('/allow', allowRouter)
app.use('/delay', delayRouter)
app.use('/', appRouter)

app.use(notFound)

app.use(errorHandler)

export default app;

