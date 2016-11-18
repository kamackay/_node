const _ = {};

_.s = function (o) { return (typeof o === 'object') ? JSON.stringify(o, null, 4) : o; }
_.log = function (a, b, c, d) {
    const t = function (o) {
        switch (typeof o) {
            case 'undefined':
                return;
            case 'string':
                return o;
            case 'object': return _.s(o);
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

module.exports = _;