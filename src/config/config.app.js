const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3030,
    },
    db: {
        host: process.env.DEV_DB_HOST || "127.0.0.1",
        port: process.env.DEV_DB_PORT || "",
        name: process.env.DEV_DB_NAME || "OrderPes",
    },
};

const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3001,
    },
    db: {
        host: process.env.PRO_DB_HOST || "127.0.0.1",
        port: process.env.PRO_DB_PORT || "",
        name: process.env.PRO_DB_NAME || "OrderPes",
    },
};

const config = { dev, pro }
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]