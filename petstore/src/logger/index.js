require('dotenv').config();

module.exports = prefix => {
    return {
        info: msg => {
            console.log(`[${prefix}] - INFO - ${msg}`);
        },
        debug: msg => {
            if (process.env.NODE_ENV == 'dev') {
                console.log(`[${prefix}] - DEBUG - ${msg}`);
            }
        }
    }
}