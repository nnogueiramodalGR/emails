var express = require('express');
var consign = require('consign');
const email = require('nodemailer');

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./public'));



consign()
	.include('app/models/index.js')
	.then('./app/routes')
	// .then('config/dbConnection.js')
	// .then('app/models')
	.into(app)


module.exports = app;
