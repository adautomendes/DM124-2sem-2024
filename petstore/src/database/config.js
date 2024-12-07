require('dotenv').config();

module.exports = {
    DB_URL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,

    DB_SETTINGS: {
        dbName: `${process.env.DB_NAME}`
    }
};