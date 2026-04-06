// config/dbconnection.js
const mongoose = require('mongoose');

const dbconnection = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/Online_Learning', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
};

module.exports = dbconnection;
