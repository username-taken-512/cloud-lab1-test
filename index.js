const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

// For PostGRE db
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// Router for Lab 1
const lab1Router = require('./router/lab1Router');
app.use('/lab1', lab1Router);

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