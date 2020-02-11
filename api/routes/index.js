const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');
const authRoutes = require('./authRoutes');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRoutes);

module.exports = app;
