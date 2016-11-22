var express = require("express");
var app = express();
var math = require('mathjs');
var router = express.Router();
const _ = require('./_');

router.post('/', function (request, response, next) {
    try {
        const data = request.body;
        if (data && data.type) {
            switch (data.type) {
                case 'math':
                    // Use the math API
                    var mathQuery = data.query;
                    var answer = math.eval(mathQuery);
                    answer = answer === Infinity ? '&infin;' : answer;
                    response.status(200).json({
                        question: mathQuery,
                        answer: answer
                    });
                    _.log("Math Query", _.s({
                        question: mathQuery,
                        answer: answer
                    }));
                    return;
                case 'formatMath':
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
    } catch (err) {
        _.log(err.message);
        response.status(500).json(err);
    }
});

module.exports = router;
