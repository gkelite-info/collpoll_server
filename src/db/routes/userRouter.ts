import express from 'express'
import User from '../models/user';


const UserRouter = express.Router()

UserRouter.get('/', async (req, res) => {
    try {
        const data = await User.findAll();
        res.status(200).send({ message: 'Fetched successfully', data })
        return
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
        return
    }
});


export default UserRouter;