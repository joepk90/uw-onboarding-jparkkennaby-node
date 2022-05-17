const express = require('express');
const getDate = require('./date/date');
const app = express()
app.use(express.json());

app.use('/',  async (req, res) => {
    res.send(getDate());
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})
