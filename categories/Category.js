const Sequelize = require("sequelize");  //importando o sequelize que tem a função de se conectar com db
const connection = require("../database/database"); //conectando ao databse.js


//definindo uma tabela para o db
const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
    
});


Category.sync({force: false});

module.exports = Category;