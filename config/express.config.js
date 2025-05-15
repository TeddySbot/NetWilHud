const express = require('express');
const path = require('path');

const configureExpress = (app) => {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
};

module.exports = configureExpress;