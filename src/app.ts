import express from 'express';
import dotenv from 'dotenv'
import dbInit from './db/init';
import routes from './db/routes';
dotenv.config();

const app = express();
const port = process.env.PORT;

dbInit();

// app.use("/api/v1", routes);

app.get('/', (req, res) => {
    res.send("Heyy collpoll");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});