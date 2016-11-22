var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var modules = {
    math: require('./math'),
    format: require('./format'), 
    holidays: require('./holidays')
};

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
app.use('/format', modules.format);
app.use('/holidays', modules.holidays);

app.listen(5000, function () {
    _.log('UMA Client now running on port 5000\n');
});

module.exports = app;