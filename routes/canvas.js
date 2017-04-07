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
  const results = [];
  const query = client.query('select * from canvas order by id asc;');
  query.on('row', row => results.push(row));

  query.on('end', () => {
    return callback(results);
  });
}


// Route Handling.
router.post('/', (req, res, next) => {
  const title = req.body.title || '';
  pg.connect(process.env.DB_URL, (err, client, done) => {
    handleError(err);

    return client.query('insert into canvas(title) values($1) returning id;',
      [title], (err, result) => {
        handleError(err);

        const id = result.rows[0].id;

        return client.query('insert into canvasfields(canvasId) values($1);',
          [id], (err) => {
            handleError(err);

            done();
            return res.render('canvas', { title, id, boxes: [] });
        });
    });
  });
});

router.get('/', (req, res, next) => {
  const results = [];
  pg.connect(process.env.DB_URL, (err, client, done) => {
    handleError();

    const callback = (results) => {
      done();
      return res.json(results);
    };

    return getCanvasList(client, callback);
  });
});

router.get('/:id', (req, res, next) => {
  let canvas;
  const id = req.params.id;
  pg.connect(process.env.DB_URL, (err, client, done) => {
    handleError();

    const query = client.query('select * from canvas where id=($1);', [id]);

    query.on('row', row => canvas = row);
    query.on('end', () => {
      done();
      return res.render('canvas', { title: canvas.title, id: canvas.id, boxes: [] });
    });
  });
});

router.put('/:id', (req, res, next) => {
  const results = [];
  const id = req.params.id;
  const title = req.body.title;
  pg.connect(process.env.DB_URL, (err, client, done) => {
    handleError();

    const query = client.query('update canvas set title=($1) where id=($2);',
      [title, id], (err, result) => {
        if (err) {
          return false;
        }

        return true;
      });
  });
});

module.exports = router;
