const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
