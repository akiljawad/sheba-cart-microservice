require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    db: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '@Kil201514057',
        database: process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME || 'cart_db',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
    },
    jwtToken: process.env.JWT_SECRET || "Lkbn1h?b5IQE&ucKIt{y3?PpCGDw%S3k6tbM:/WoI>+2qO8o",
    jwtRefreshToken: process.env.JWT_REFRESH_SECRET || "PpCGDw%S3k6tbM:/WoI>+2qO8oLkbn1h?b5IQE&ucKIt{y3?",
};