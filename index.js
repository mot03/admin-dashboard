
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg')

const app = express();

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');*/


const connectionString = 'postgresql://postgres:password@localhost:5432/postgres';
const client = new Client({
  connectionString: connectionString,
});

client.connect((err, cli) => {
    console.log('error');
    console.log(err);
    console.log('not err');
    console.log(cli);
});

