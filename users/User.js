const Sequelize = require("sequelize");  //importando o sequelize que tem a função de se conectar com db
const connection = require("../database/database"); //conectando ao databse.js


//definindo uma tabela para o db
const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password:{
        type: Sequelize.STRING,
        allowNull: false
    }
    
});


 // User.sync({force: true});

module.exports = User;