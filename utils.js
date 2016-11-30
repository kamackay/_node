const _ = require('./_');
var express = require("express");
var app = express();
var router = express.Router();

router.post(['*', '/*', '/'], function holidayReq(request, response, next) {
    try {
        const data = request.body;
        if (data && data.type) {
            switch (data.type) {

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

module.exports = router;