const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // The checkPassword method takes the loginPw argument,
    // then executes the compareSync method on bcrypt object.
    // The compareSync method passes the arguments loginPw and this.password,
    // Checking if the loginPw(user input) with the password stored in the database
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
}

// User contains the objects for user_id, username, email and password.
User.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6],
        },
        },
    },
    {
        hooks: {
            // The beforeCreate function returns a modified newUserData object. 
            // A new user will be created with a hashed password instead of the original plain text password that was input by user.
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

//export user data
module.exports = User;
  