
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routers/userRouter');
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'public', 'userImages', '7563112.jpg');
console.log('testinggggg');
console.log(fs.existsSync(filePath)); // Should return true

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const dbUrl = "mongodb+srv://colors:colors123@colors.vngpy.mongodb.net/";
mongoose.connect(dbUrl).then(() => console.log('database connected successfully'))
.catch((er) => console.log(er));

app.use('/', userRouter);

app.get('/get-user-details', (req, res) => {
    res.json({username: "aditya", userroll: "123455"});
})

app.post('/add-user', (req, res) => {
    console.log(req.body);
    res.send('user added successfully')
})

app.listen(7000, () => {
    console.log('server running at port 7000');
})

