const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());


// user routes
app.get('/user', (req, res) => {
  const credentials = {
    username: req.query.username,
    password: req.query.password,
  };
  db.selectUserName(credentials, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/user', (req, res) => {
  const userInfo = req.body;
  db.addUser(userInfo, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// show routes
app.get('/shows', (req, res) => {
  const { username } = req.query;
  db.getShowsAtUsername(username, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/getAllShows', (req, res) => {
  db.getAllShows((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


app.post('/shows', (req, res) => {
  const showInfo = req.body;
  db.addShow(showInfo, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/shows', (req, res) => {
  const showInfo = req.body;
  console.log(showInfo);
  db.addUserToShow(showInfo, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
