import express from 'express'
import UserRouter from './userRouter';


const routes = express.Router();

routes.use('/user', UserRouter);

export default routes;