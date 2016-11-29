var express = require("express");
var app = express();
var math = require('mathjs');
var router = express.Router();
const _ = require('./_');
var request = require('request');

router.post(['*', '/', '/*'], function (request, response, next) {
    try {
        const data = request.body;
        if (data && data.type) {
            switch (data.type) {
                case 'image':
                    var url = data.url;
                    convertImageToBase64(url, function (data) {
                        var o = { url: url, data64: data }; 
                        resp.json(o); _.l(o);
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
    request.get('http://tinypng.org/images/example-shrunk-8cadd4c7.png', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
            if (typeof func === 'function') func(data);
        }
    });
}

module.exports = router;