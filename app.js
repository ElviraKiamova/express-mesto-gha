/* eslint-disable no-unused-vars */
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use((req, res, next) => {
  req.user = {
    _id: '63259e04caba818adc7ca05a',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// app.get('/', (req, res) => {
//   res.status(200).json('Сервер работает');
// });

app.listen(PORT);
