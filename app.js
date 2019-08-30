'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(require('./controllers'));

mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true, useFindAndModify: false});
mongoose.connection.on('connected', () => {
  console.log(`MongoDB connection successful`);

  app.listen(port, (err) => {
      if(!err) {
          console.log(`App is running on port ${port}`);
      } else {
          console.log(`Port ${port} is already used`);
      }
  });
}).on('error', (error) => {
  console.log(`MongoDB connection failed due to the error: ${error}`);
});

module.exports = app;
