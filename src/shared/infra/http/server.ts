import 'reflect-metadata';
import 'dotenv/config';

import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import routes from './routes';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';

import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }
        console.error(err);
        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    },
);

app.get('/', (request, response) => {
    return response.json({ message: 'Big Rocks!' });
});

app.listen(3333, () => {
    console.log('🚀 Lift off!!!!!!!!!!!!!!!!');
    console.log(`environment -> ${process.env.BASE_URL}`);
});
