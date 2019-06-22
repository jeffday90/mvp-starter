/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/showApp');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  zip: Number,
  friends: [String],
});

const showSchema = mongoose.Schema({
  artists: [String],
  attendees: [String],
  links: [String],
  venue: String,
  day: Number,
  month: Number,
});

// what needs to go in the show obj??
// what artists are playing
// date
// venue

const User = mongoose.model('User', userSchema);
const Show = mongoose.model('Show', showSchema);

const addUser = (userInfo, callback) => {
  console.log(userInfo);
  const newUser = new Show({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    username: userInfo.username,
    email: userInfo.email,
    password: userInfo.password,
    zip: Number(userInfo.zip),
    friends: [],
  });
  newUser.save();
  callback(null, 'successful insertion');
};

// get user is below
const selectUserName = (credentials, callback) => {
  const { username, password } = credentials;
  User.find({ username }, (err, items) => {
    if (err) {
      callback(err);
    } else {
      if (items.length === 0) {
        items = 'account not found';
      } else if (password !== items[0].password) {
        items = 'Wrong password';
      }
      callback(null, items);
    }
  });
};


// update operation

const addShow = (show, callback) => {
  const showInfo = new Show({
    artists: show.artists,
    links: show.links,
    attendees: show.attendees,
    venue: show.venue,
    day: show.day,
    month: show.month,
  });
  showInfo.save();
  callback(null, 'successful insertion');
};

const getShowsAtUsername = (username, callback) => {
  Show.find({ attendees: [username] }, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const getAllShows = (callback) => {
  Show.find({}, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

// add friend
// update operation

module.exports = {
  selectUserName,
  addUser,
  addShow,
  getShowsAtUsername,
  getAllShows,
};
