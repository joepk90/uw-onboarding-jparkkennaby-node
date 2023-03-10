const express = require('express');
const client =  require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counter = new client.Counter({
    name: 'onboarding_request_count', // requests_count
    help: "A counter of the number of total requests received",
  });
  

const getDate = require('./date/date');

const app = express()
app.use(express.json());

app.get('/__/metrics', async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const metrics = await client.register.metrics();
    // console.log(metrics);
    return res.send(metrics)
});

app.get('/',  async (req, res) => {
    
    counter.inc(); // Increment by 1
    
    let count;
    if (counter.hashMap[''].value) {
        count = counter.hashMap[''].value;
    }
    
    console.log(`${counter.name}: ${count}`);
    
    res.send(getDate());
    
});

app.listen(8080, () => {
    console.log(`Example app listening on port 8080`)
})
