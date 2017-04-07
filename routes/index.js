'use strict';

var express = require('express');
var router = express.Router();
require('dotenv').config(); // Set env vars.
const pg = require('pg');


// Helper functions.
function handleError (err) {
  if (err) {
    done();
    console.log(err);
    return res.status(500).json({ success: false, data: err });
  }
}

function getCanvasList (client, callback) {
  const canvases = [];
  const query = client.query('select * from canvas order by id asc;');
  query.on('row', row => canvases.push(row));

  query.on('end', () => {
    return callback(canvases);
  });
}


// Route handling.
router.get('/', function(req, res, next) {

  pg.connect(process.env.DB_URL, (err, client, done) => {
    handleError(err);

    const callback = function(canvases) {
      done();
      res.render('index', { title: 'Running Lean', canvases });
    };

    getCanvasList(client, callback);
  });
});


module.exports = router;
