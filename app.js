const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter')

const port = process.env.port || 8080;

const app = express();

mongoose.connect('mongodb://localhost:27017/movieapp', { useNewUrlParser: true })
const db = mongoose.connection;

db.on("error", () => { console.log("error in connection"); })
db.once('open', () => { console.log("connected") })


app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/', homeRouter);

app.listen(port)

