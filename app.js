const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const routerErrorWay = require('./routes/errors');
const errorHandler = require('./middlewares/errorHandler');
const { registerValid, loginValid } = require('./middlewares/validation');
const { requestLogger, errorLoger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.post('/signin', loginValid, login);
app.post('/signup', registerValid, createUser);

app.use('/cards', require('./routes/cards'));

app.use(errorLoger);
app.use(auth);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(routerErrorWay);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
