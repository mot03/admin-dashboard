// package utilities
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg')


// local utilities
const queries = require('./queries');


// create express app
const app = express();


// app settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');


// start the app
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


// connect to psql with pg
const connectionString = 'postgresql://postgres:password@localhost:5432/postgres';
const client = new Client({
  connectionString: connectionString,
});

client.connect(err => {
  if(err) throw new Error('could not connect, ' + err);
});


// dynamic data
app.locals.databases = null;

client.query(queries.query1, (err, result) => {
  if (err) throw err

  app.locals.databases = result.rows;
  console.log(app.locals);
});


// routes
app.get('/', (req, res) => {
  console.log('get /');
  return res.render('index');
})


app.get('/create-database', (req, res) => {
  console.log('create-database');

  client.query(`CREATE DATABASE postDB`, (err, result) => {
    if (err) {
      throw err
    }
    return res.json({ info: 'Databse Created (I think)' })
  });
});
