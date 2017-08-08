const express = require('express');
const bodyParser = require('body-parser');

//CROSS SITE SCRIPTING
const cors = require('cors');

//For session.
const session = require('express-session');

//Secrets.
const config = require('./config.js');

//secrete session code file. --- later for individual accounts save.
// const config = require('./config.js');

//Sql Database connection tool --- later for db
const massive = require('massive'); //Postgres SQL tool

//===INITIALIZE EXPRESS APP===================
const app = module.exports = express();
const port = 8080;


// =========Public root web Middleware======== //
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
// =========Public root web Middleware======== //

// =========SQL database======== //
var conn = massive.connectSync({
  connectionString: config.connectionString
});

//setting database connection.
app.set('db', conn);
const db = app.get('db');

//Custom Scripts =========================
const quotes = require('./server/quoteCtrl.js');


// If database table is not found create.
db.table_check((err, response) => {
  if (response) {
    console.log('Table not exist. Creating new.')
  } else {
    console.log(err);
  }
});


// =========SQL database======== //


app.get('/api/quotes', quotes.getQuotes);
app.post('/api/quotes/save', quotes.saveQuotes);
app.get('/api/bibleQuotes', quotes.getBibleQuotes);



//===PORT====================================
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
