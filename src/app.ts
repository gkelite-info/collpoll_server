import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import dbInit from './db/init';

const app = express();
const port = process.env.PORT;

dbInit();

app.get('/', (req, res) => {
    res.send("Heyy collpoll");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});