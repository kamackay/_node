var modules = {};
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
modules.math = require('./math');
const _ = require('./_');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/math', modules.math);

app.listen(5000, function () {
    _.log('UMA Client now running on port 5000\n');
});

module.exports = app;