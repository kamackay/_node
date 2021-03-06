var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var modules = {
  math: require("./math"),
  format: require("./format"),
  holidays: require("./holidays"),
  convert: require("./convert"),
  utils: require("./utils"),
  auth: require("./auth")
};
const _ = require("./_");
const router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

_.keys(modules).forEach(function(key) {
  app.use("/" + key, modules[key]);
  _.log('Loaded Module "' + key + '"');
});

app.all(["/version", "/version/*"], function(req, res, next) {
  const o = { version: _.version };
  res.json(o);
  _.log(o);
});

app.listen(8080, function() {
  _.log("Server now running on port 8080 (" + _.getDateStr() + ")\n");
});

module.exports = app;
