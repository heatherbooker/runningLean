'use strict';

var express = require('express');
var router = express.Router();
require('dotenv').config(); // Set env vars.
const db = require('../models/database.js');
const dbClient = new db();


router.post('/', (req, res, next) => {
  const title = req.body.title || '';

  dbClient.create(title).then(data => {
    res.redirect(`/canvas/${data.id}`);
  });
});

router.get('/', (req, res, next) => {

  dbClient.getAll().then(canvases => {
    res.render('index', { title: 'Running Lean', canvases });
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  dbClient.getById(id).then(canvas => {
    res.render('canvas', canvas);
  });
});

router.put('/:id', (req, res, next) => {
  const results = [];
  const id = req.params.id;

  dbClient.update(id, req.body).then(didUpdate => {
    if (didUpdate) {
      return res.sendStatus(200);
    }
    return res.sendStatus(500);
  });
});

module.exports = router;
