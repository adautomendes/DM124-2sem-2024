module.exports = {
    DB_URL: `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '27017'}`,

    DB_SETTINGS: {
        dbName: `${process.env.DB_NAME || 'petstore'}`
    }
};