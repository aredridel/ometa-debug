function repeat(s, m) {
    var a = [];
    for (var i = 0; i < m; i++) {
        a.push(s);
    }
    return a.join('');
}

module.exports = function(ometa) {
    var indent = 0;

    var matchAll = ometa.prototype.matchAll;

    ometa.prototype.matchAll = function() {
        indent = 0;
        return matchAll.apply(this, arguments);
    };

    var match = ometa.prototype.match;

    ometa.prototype.match = function() {
        indent = 0;
        return match.apply(this, arguments);
    };

    var rule = ometa.prototype._rule;
    ometa.prototype._rule = function() {
        console.log(repeat(' ', indent), '>', arguments[0], arguments[2] && arguments[2].length ? arguments[2] : '');
        indent ++;
        var v = rule.apply(this, arguments);
        indent --;
        console.log(repeat(' ', indent), '<', arguments[0], v, v ? JSON.stringify(this._getIntermediate()) : '', JSON.stringify(this._source.slice(this._offset)));
        return v;
    };
};
