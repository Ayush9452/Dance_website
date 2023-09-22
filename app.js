const express = require("express");
const app = express();
const bodyparser = require('body-parser')
const pug = require("pug");
const path = require("path");
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/contact');
const port = 80;

const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
  });

const contact = mongoose.model('contact', contactschema);

// app.set('static', express.static('static'));
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('/views',path.join(__dirname,'views'));

app.get('/',(req,res) => {
    res.status(200).render('index.pug');
})

app.get('/contact',(req,res) => {
    res.status(200).render('contact.pug');
})

app.post('/contact',(req,res) => {
    var mydata = new contact(req.body);
    mydata.save().then(() => {
        res.send("Saved")
    }).catch(() => {
        res.status(400).send("Not Saved")
    })
})

//starting server
app.listen(port,(req,res) => {
    console.log("Working Fine...");
})