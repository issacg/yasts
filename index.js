var moment = require('moment');

module.exports = function() {
    var maxAge, includeSubdomains;
    if (arguments.length > 1 && typeof(arguments[0]) == "number" && typeof(arguments[1]) == "string") {
        // Detect relaxed duration format
        maxAge = moment.duration(arguments[0], arguments[1]);
    } else {
        maxAge = moment.duration(arguments[0])
    }

    if (typeof(arguments[arguments.length-1]) == "boolean") {
        // read includeSubdomains
        includeSubdomains = arguments[arguments.length-1];
    }

    var header = "max-age=" + maxAge.asMilliseconds();
    if (includeSubdomains) {
        header += "; includeSubDomains";
    }

    return function(req, res, next) {
        res.set("Strict-Transport-Security", header);
        next();
    }
};