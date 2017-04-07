'use strict';

var express = require('express');
var router = express.Router();
require('dotenv').config(); // Set env vars.
const db = require('../models/database.js');
const dbClient = new db();


// Route handling.
router.get('/', function(req, res, next) {

  dbClient.getAll().then(canvases => {
    res.render('index', { title: 'Running Lean', canvases });
  });
});


module.exports = router;
