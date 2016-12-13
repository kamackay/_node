var express = require("express");
var app = express();
var router = express.Router();
const _ = require('./_');

var f = function (request, response, next) {
    try {
        var url = request.url;
        _.log({ url: url });
        response.send("OK");
    } catch (err) {
        _.err(err);
        response.status(500).json(err);
    }
};
router.all('*', f);

module.exports = router;