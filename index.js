"use strict";
require('babel-register')({
  "presets": [
    "es2015",
    "es2017",
    //"stage-0"
  ],
  "plugins": [
    "transform-decorators-legacy",
  ]
}
);
require('babel-polyfill');

const express = require('express')
const app = express()
const Routes = require('./app/routes');
app.get('/', (req, res) => res.send('Hello World!'))
console.log(new Routes().router0)
new Routes().use(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
