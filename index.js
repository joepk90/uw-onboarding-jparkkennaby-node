const express = require('express');
const app = express()
app.use(express.json());

const getDate = () => new Date();

app.use('/',  async (req, res) => {
    res.send(getDate());
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})