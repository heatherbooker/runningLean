'use strict';

require('dotenv').config(); // Set env variables.
const pg = require('pg');
const DB_url = process.env.DB_URL;


// Helper functions.
function handleError (err) {
  if (err) {
    done();
    console.log(err);
    return res.status(500).json({ success: false, data: err });
  }
}

function getCanvasFields (client, id) {
  return new Promise((resolve, reject) => {
    const fields = [];

    const query = client.query('select * from canvasfields where canvasid=($1)', [id]);

    query.on('row', row => fields.push(row));
    query.on('end', () => {
      resolve(fields);
    });
  });
}

function DBClient () {

  this.client = new pg.Client(DB_url);
  this.client.connect();

  this.create = function(title) {
    return new Promise((resolve, reject) => {
      this.client.query('insert into canvas(title) values($1) returning id;',
        [title], (err, result) => {
          handleError(err);

          const id = result.rows[0].id;

          // Add canvasfields table entry (all fields default to empty string).
          this.client.query('insert into canvasfields(canvasId) values($1);',
            [id], (err) => {
              handleError(err);

              const data = { title, id, boxes: [] };
              resolve(data);
          });
      });
    });
  };

  this.update = function(id, data) {
    // idk???!
    return new Promise((resolve, reject) => {
      const queryData = [id];
      Object.keys(data).forEach(prop => {
        if (prop !== 'canvasid') {
          if (prop === 'id') {
            return console.log('ARJHBJB!');
          }
          queryData.push(prop, data[prop]);
        }
      });
      console.log(queryData);
      this.client.query(`this query sux`,
        queryData, (err, result) => {
          if (err) {
            console.error(err);
            return resolve(false);
          }

          resolve(true);
      });
    });
  };

  this.getAll = function(callback) {
    return new Promise((resolve, reject) => {

      const canvases = [];
      const query = this.client.query('select * from canvas order by id asc;');
      query.on('row', row => canvases.push(row));

      query.on('end', () => {
        resolve(canvases);
      });
    });
  };

  this.getById = function(id, callback) {
    return new Promise((resolve, reject) => {

      let canvas;
      const query = this.client.query('select * from canvas where id=($1);', [id]);

      query.on('row', row => canvas = row);
      query.on('end', () => {
        getCanvasFields(this.client, id).then(fields => {

          const data = {
            title: canvas.title,
            id,
            fields: fields[0]
          };
          resolve(data);
        });
      });
    });
  };

  this.delete = function() {
    return new Promise((resolve, reject) => {
      reject('not implemented!');
    });
  };

};

module.exports = DBClient;
