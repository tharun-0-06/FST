const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile('//home/fullstacklab/TharunFST/week7/login/login.html');
    console.log('get');
});
app.post("/info", (req, res) => {
    console.log('post', req.body);
    console.log(`Name : ${req.body.name}\nEmail : ${req.body.email}\nAge : ${req.body.age}`);
    res.send("You are logged in");
});


app.listen(port, () => {
    console.log(`test listening on port ${port}`);
});
