var path = require('path');
require('dotenv').config();

const formatJson = obj => JSON.stringify(obj, null, 4)

module.exports = prefix => {
    prefix = path.basename(prefix);

    return {
        info: msg => {
            console.log(`[${prefix}] - INFO - ${msg}`);
        },
        debug: msg => {
            if (process.env.NODE_ENV == 'dev') {
                console.log(`[${prefix}] - DEBUG - ${msg}`);
            }
        },
        request: req => {
            if (process.env.NODE_ENV == 'dev') {
                console.log(`[${prefix}] - DEBUG - ${req.path}`);
                console.log(formatJson(req.body));
            } else {
                console.log(`[${prefix}] - INFO - ${req.path}`);
            }
        },
    }
}