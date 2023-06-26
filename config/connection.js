// imported the Sequelize and dotenv modules
const Sequelize = require('sequelize');
require('dotenv').config();

// declared a variable named sequelize
let sequelize;

// When the JAWSDB_URL variable is defined,
// the operation within the if statement will be executed.
if (process.env.JAWSDB_URL) {
    // A new instance of the Sequelize class is created and assigned to the variable sequelize,
    // The JAWSDB_URL gets passed onto Sequelize as an argument
    sequelize = new Sequelize(process.env.JAWSDB_URL);
    // The Sequelize Constructor is used to connect to the database 
} else {
    // When the JAWSDB_URL variable is not defined,
    // the following operation will be executed.
    // A new instance of the Sequelize class is created and assigned to the variable sequelize,
    sequelize = new Sequelize(
        // The Sequelize constructor will call onto the following four arguments:
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        // an options object that specifies the host, dialect and port
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

// exports the values of the variable sequelize
module.exports = sequelize;