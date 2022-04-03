const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;


// npm start [arg1] [arg2] ...
// - arg1 for db: $db = heroku config:get DATABASE_URL -a cloud-lab1
//   npm start $db
const npmParams = process.argv.slice(2);

// For PostGRE db
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || (npmParams[0] || 'postgres://lyeqjenywmqaqa:a01307f561de9f2c77416c542330554b1a1ea5814bfa2542847def3dffab31d3@ec2-34-246-227-219.eu-west-1.compute.amazonaws.com:5432/dbghtf4j5l65ac'),
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// Router for Lab 1
const lab1Router = require('./router/lab1Router');
app.use('/lab1', lab1Router);

// Router for Lab 2 - Calculator
const lab2Router = require('./router/lab2Router');
app.use('/lab2', lab2Router);

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => { res.render('index', { text: "No route" }) })
  .get('/echo/:msg', (req, res) => { res.send(req.params.msg) })  // Echo test route
  .get('/db', async (req, res) => { // Db test route
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null };
      //res.render('pages/db', results);
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

console.log('Hej från index.js');