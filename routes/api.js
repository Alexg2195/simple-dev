var express = require('express');
var router = express.Router();

// Controllers
var users_route = require('../controllers/users');
var user_route = require('../controllers/user');
var user_route = require('../controllers/user');
var user_route = require('../controllers/user');

// Routes
app.use('/users', users_route);
app.use('/user', user_route);
app.use('/user', user_route);
app.use('/user', user_route);

module.exports = router;
