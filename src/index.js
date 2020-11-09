require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


/**
 * DATA BASE SETUP
 */


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan());
app.use('/files',express.static(path.resolve(__dirname,'..','tmp','uploads')))
app.use(require('./routes'))

app.listen(3001, (req, res) => {
    console.log("API Online: http://localhost:3001")
})