const _ = require('./_');
var express = require("express");
var app = express();
var math = require('mathjs');
var router = express.Router();
var staticData = require('./data/holidays.json');

// router.post('/', holidayReq);
router.get('/*', function (request, response, next) {
    try {
        var urlS = request.url.split('/'), urlInfo = [];
        for (var i = 0; i < urlS.length; i++)
            if (urlS[i] !== "") urlInfo.push(urlS[i]);
        if (urlInfo.length >= 1 && urlInfo[0].length <= 2) {
            var month = parseInt(urlInfo[0]);
            var year = (urlInfo.length >= 2) ? parseInt(urlInfo[1]) : new Date().getFullYear();
            console.log('year', year);
            var hols = getHolidays(month, year);
            _.sendJSON(response, hols);
            _.log(hols);
        } else {
            var h = [];
            var year = (urlInfo.length >= 1 && urlInfo[0].length === 4)
                ? parseInt(urlInfo[0]) : new Date().getFullYear();
            for (var i = 0; i < 12; i++)
                h = h.concat(getHolidays(i, year));
            _.log('All Holidays in ' + year.toString(), h);
            _.sendJSON(response, h);
        }
    } catch (e) {
        _.err(e);
        response.status(500).json(e);
    }
});

function getHolidays(month, year) {
    var o = [];
    staticData.holidays.forEach(function (h) {
        if (h.date.month == month) o.push(h);
    });
    var easter = getEaster(year);
    if (easter.month === month)
        o.push({
            date: {
                month: easter.month,
                day: easter.day
            }, name: "Easter Day", link: 'https://en.wikipedia.org/wiki/Easter'
        })
    return o;
}

function getEaster(year) {
    var temp = {};
    temp.c = Math.floor(year / 100);
    temp.n = year - 19 * Math.floor(year / 19);
    temp.k = Math.floor((temp.c - 17) / 25);
    temp.i = temp.c - Math.floor(temp.c / 4) - Math.floor((temp.c - temp.k) / 3) + 19 * temp.n + 15;
    temp.i = temp.i - 30 * Math.floor((temp.i / 30));
    temp.i = temp.i - Math.floor(temp.i / 28) * (1 - Math.floor(temp.i / 28) * Math.floor(29 / (temp.i + 1)) * Math.floor((21 - temp.n) / 11));
    temp.j = year + Math.floor(year / 4) + temp.i + 2 - temp.c + Math.floor(temp.c / 4);
    temp.j = temp.j - 7 * Math.floor(temp.j / 7);
    temp.l = temp.i - temp.j;
    temp.m = 3 + Math.floor((temp.l + 40) / 44);
    temp.d = temp.l + 28 - 31 * Math.floor(temp.m / 4);
    return { month: temp.m, day: temp.d };
}

module.exports = router;