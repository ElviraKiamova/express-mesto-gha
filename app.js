/* eslint-disable no-unused-vars */
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  extended: true,
}));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  req.user = {
    _id: '622458d61f7bc162137cd177',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT, () => {});
