var express = require('express');
var router = express.Router();

// Controllers
var users_route = require('../controllers/users');

// Routes
app.use('/users', users_route);

module.exports = router;
