const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {}

// define table columns and config
User.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE
        // define an id column
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        //define username column
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //no duplicates
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // define a pass column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // at least 4 characters long
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIG OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt, updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        //use underscores instread of camel-casing
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;