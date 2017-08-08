const app = require('../index.js');
const axios = require('axios');
const db = app.get('db');

// debugger;
// console.log('Show me what is inside app: ', app);

exports.getQuotes = (req, res) => {
  console.log('getquotes Activated from Node.');
  axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en').then((response) => {
    console.log('Testing showing the response from getquotes: ', response.data);
    res.status(200).send(response.data);
  });
};

exports.saveQuotes = (req, res) => {
  console.log('saveQuotes Activated!!')
  const data = req.body;
  db.add_quotes([data.quote, data.author], (err, quote) => {
    if (err) {
      console.log('Error occur creating quotes');
      console.warn('error', err);
      return res.status(500).send(err);
    } else {
      res.status(200).send(quote);
    }
  });
};

exports.getBibleQuotes = (req, res) => {
  axios.get('http://labs.bible.org/api/?passage=random&type=json').then((response) => {
    console.log('Testing showing the response getBibleQuotes: ', response.data);
    res.status(200).send(response.data);
  });
};