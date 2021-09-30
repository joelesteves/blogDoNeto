const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress', 'netodev', 'jn13081997', {
    host: 'localhost', 
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;