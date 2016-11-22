var express = require("express");
var app = express();
var router = express.Router();
const _ = require('./_');

router.post('/', function (request, response, next) {
    try {
        const data = request.body;
        if (data && data.type) {
            switch (data.type) {
                case 'code-js':
                    var str = data.str;
                    var formatStr = _.prettyPrint(str);
                    _.log('Request To Pretty Print JS String', _.s({
                        original: str,
                        formatted: formatStr
                    }));
                    response.json({ formatted: formatStr });
                    return;
                case 'math':
                    var str = data.str;
                    var formatStr = _.prettyPrint(str);
                    _.log('Request To Pretty Print Math String', _.s({
                        original: str,
                        formatted: formatStr
                    }));
                    response.json({ formatted: formatStr });
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

module.exports = router;