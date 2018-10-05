// const { check, validationResult } = require('express-validator/check');
var express = require('express');
var router = express.Router();
var authroute = require('./authrouter.js')
// var app = express();
var users = require('./Controller/userController.js');
// router.route("/register");
router.post('/register', users.registration);
router.post('/login',users.login);
router.use('/auth',authroute)
// app.use('/', router);
module.exports=router;