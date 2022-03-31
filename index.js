const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();

// app.use (express.static (path.join (__ dirname, '../dist')));
app.use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  .get('/hej', (req, res) => { res.send('Hejhej!') })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

console.log('Hej från index.js');


