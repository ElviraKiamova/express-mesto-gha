// app.js включает основную логику сервера, запуск и подключение к базе данных;

const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();


mongoose.connect('mongodb://localhost:27017/mestodb', {});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});