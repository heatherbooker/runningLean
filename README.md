### Running Lean Canvases

SET UP:

```bash
git clone git@github.com:heatherbooker/runningLean.git
cd runningLean
npm install
touch .env
which psql
```

If at this point, you get a message `psql not found`, you will need to [install postgres](https://wiki.postgresql.org/wiki/Detailed_installation_guides) and any necessary dependencies on your computer.

Then create a database for runninglean and have it running. Next:

```bash
node models/migrate.js
```

will create canvas and canvasfields tables.

Now add necessary environment variables to the .env file, in the form of:

```
ENV_VAR=somestring
```
This will include the database connection string.
