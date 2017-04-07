const rl = require('readline').createInterface({input: process.stdin, output: process.stdout});

const warning = `In order for this to work, you must have first created a psql db, have it
running, and set the env var DB_URL to the connection string. 
(Ex. postgres://username:password@localhost/dbname )
If you have done that, type 'yes' and press enter. Otherwise press ctrl+c to exit.`;

rl.question(warning, response => {
  console.log(response);
  if (response.trim().toLowerCase() === 'yes') {
    createTables();
    rl.close();
  } else {
    rl.close();
  }
});


function createTables() {
  const pg = require('pg');
  const DB_url = process.env.DB_URL;

  const client = new pg.Client(DB_url);
  client.connect();

  const queryToCreateCanvas = client.query(`
    create table Canvas (
      ID serial primary key,
      Title text
    );
  `);

  const queryToCreateCanvasFields = client.query(`
    create table CanvasFields (
      canvasID int references canvas,
      Problem text default '',
      CustomerSegments text default '',
      UniqueValueProposition text default '',
      Solution text default '',
      Channels text default '',
      RevenueStreams text default '',
      CostStructure text default '',
      KeyMetrics text default '',
      UnfairAdvantage text default ''
    );
  `);

  queryToCreateCanvasFields.on('end', () => { client.end(); });
}
