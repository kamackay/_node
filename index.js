const version = '1.0.1';
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var modules = {
    math: require('./math'),
    format: require('./format'),
    holidays: require('./holidays'),
    convert: require('./convert')
};
const _ = require('./_');
const router = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));

Object.keys(modules).forEach(function (key) {
    app.use('/' + key, modules[key]);
});
app.all(['/version', '/version/*'], function (req, res, next) {
    const o = { version: version }
    res.json(o);
    _.l(o);
});

app.listen(5000, function () {
    _.log('UMA Client now running on port 5000\n');
});

module.exports = app;