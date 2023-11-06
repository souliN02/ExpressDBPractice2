const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.run('CREATE TABLE users(fname text, lname text)', (err) => {
  if (err) {
    return console.log(err.message);
  }
});

app.post('/data', (req, res) => {
  db.run(`INSERT INTO users(fname, lname) VALUES(?,?)`, [req.body.fname, req.body.lname], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  res.send('Data received and saved');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});