
const express = require('express');
const mongoose = require('mongoose');
const router = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  extended: true }));


app.use((req, res, next) => {
  req.user = {
    _id: '622458d61f7bc162137cd177',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {useMongoClient:true});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});