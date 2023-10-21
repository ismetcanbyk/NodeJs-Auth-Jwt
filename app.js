import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './config/databaseConfig.js';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import * as authGuard from './middlewares/authGuard.js';

const app = express();
dotenv.config();


/* USES */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//Connect DB
db.then(() => {
    console.log("DB Connect Successfuly");
}).catch((err) => {
    console.log(err);
});

/* ROUTES */
app.use('/auth', authRouter);
app.use('/user', authGuard.authGuard, userRouter);

/* START SERVER */
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});