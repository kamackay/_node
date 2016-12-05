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
                    _.sendJSON(response, {
                        question: mathQuery,
                        answer: answer
                    });
                    _.log("Math Query", _.s({
                        question: mathQuery,
                        answer: answer
                    })); 
                    next();
                    return;
                case 'formatMath':
                    var str = data.str;
                    var formatStr = _.prettyPrint(str);
                    _.log('Request To Pretty Print Math String', _.s({
                        original: str,
                        formatted: formatStr
                    }));
                    _.sendJSON(response, { formatted: formatStr });
                    next();
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
    next();
});

module.exports = router;
