const _ = require('./_');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
app.use(bodyParser.json());

router.post(['*', '/*', '/'], function (request, resp, next) {
    try {
        console.log(request.body);
        const data = request.body;
        if (data && data.type) {
            switch (data.type) {
                case 'randNum':
                    if (!data.min || !data.max) {
                        resp.status(403).send('Please send a min and max for the rand number');
                        return;
                    }
                    if (data.int) {
                        // Random Integer
                        var num = _.randInt(data.min, data.max);
                        var r = { num: num };
                        _.log({ num: num, min: data.min, max: data.max });
                        _.sendJSON(resp, r);
                    } else {
                        //Random Number
                        var num = _.randNum(data.min, data.max);
                        var r = { num: num };
                        _.log({ num: num, min: data.min, max: data.max });
                        _.sendJSON(resp, r);
                    }
                    return;
            }
        } else {
            if (data) _.log('Data', _.s(data))
            _.log('Received Unknown request format');
            resp.status(400).send('Unsure what to do with this request');
        }
    } catch (e) {
        _.err(e);
        resp.status(500).json(e);
    }
});

module.exports = router;