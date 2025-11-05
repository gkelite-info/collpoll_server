import Express = require("express");

const app = Express()

const port = 5000;

app.get('/', (req, res) => {
    res.send("Heyy collpoll")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})