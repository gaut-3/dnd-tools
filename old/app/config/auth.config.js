const dotenv = require('dotenv')
dotenv.config({path: "./config.env"})
module.exports = {
    secret: process.env.JWT_SECRET
};