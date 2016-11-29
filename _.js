var jsFormatter = require('js-beautify');

const _ = {};

_.err = function (err) {
    if (typeof err !== 'undefined')
        _.log('Unexpected Error', _.s(err));
};
_.prettyPrint = function (str) {
    try {
        if (str) return jsFormatter.js_beautify(str);
        else return '';
    } catch (err) {
        _.log('Error Pretty Printing JS', err);
    }
};
_.s = function (o) { return (typeof o === 'object') ? JSON.stringify(o, null, 4) : o; }
_.log = function (a, b, c, d) {
    // Shorten the variable so that nothing printed is too large
    const s = function (o) {
        if (o && typeof o === 'string' && o.length > 100000)
            return (o.substr(5000) + '...');
        else return o;
    };
    const t = function (o) {
        switch (typeof o) {
            case 'undefined':
                return;
            case 'string':
                return s(o);
            case 'object': return s(_.s(o));
        }
    }
    if (!d) {
        if (!c) {
            if (!b) {
                console.log(t(a));
            } else console.log(t(a), t(b));
        } else console.log(t(a), t(b), t(c));
    } else console.log(t(a), t(b), t(c), t(d));

}
_.encode = encodeURIComponent;
_.serialize = function (o) {
    var s = '?'; Object.keys(o).forEach(function (k) { s += _.encode(k) + '=' + _.encode(o[k]); });
    return s;
}
_.combineObj = function (a, b, overwrite) {
    Object.keys(a).forEach(function (k) {
        if (overwrite || !a[k]) a[k] = b[k];
    });
    return a;
};


module.exports = _;