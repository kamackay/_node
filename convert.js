var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var math = require('mathjs');
app.use(bodyParser.json());
var router = express.Router();
const _ = require('./_');
var request = require('request').defaults({ encoding: null });

router.post(['*'], function (request, response, next) {
    try {
        const data = request.body;
        if (data && data.type) {
            switch (data.type) {
                case 'image':
                    var url = data.url;
                    convertImageToBase64(url, function (data) {
                        var o = { url: url, data64: data };
                        response.json(o);
                    });
                    return;
            }
        } else {
            if (data) _.log('Data', _.s(data))
            _.log('Received Unknown request format');
            response.status(400).send('Unsure what to do with this request');
        }
    } catch (e) {
        _.err(e);
        response.status(500).json(e);
    }
});

function convertImageToBase64(url, func) {
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
            if (typeof func === 'function') func(data);
        } else {
            _.l('Error');
        }
    });
}

module.exports = router;