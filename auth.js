var express = require("express");
var app = express();
var router = express.Router();
const _ = require('./_');

var f = function (request, response, next) {
    
};
router.all('*', f);

module.exports = router;