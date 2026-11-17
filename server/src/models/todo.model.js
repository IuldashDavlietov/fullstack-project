'use strict';

const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance
// const sequelize = new Sequelize('sqlite:./db.sqlite3');

// new Sequelize("postgres://USER:PASS@HOST:PORT/DBNAME");
// const sequelize = new Sequelize('postgres:Iuldash:yuldash7744@localhost:5435/Todo');

// connection for render db
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // For Render, this is usually needed
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Create a Todo model
// sequelize.define(TableName, {columns(attributes/fields)})
const Todo = sequelize.define('todos', {

    // no need to define ID field. it will be created auto.
    // id

    title: {
        type: DataTypes.STRING(256), // varchar(250),
        allowNull: false
    },

    description: DataTypes.TEXT,

    priority: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    // No need to define createdAt and updatedAt fields. it will come from sequelize
    // createdAt
    // updatedAt

    // newFiled: DataTypes.STRING
});

// Synchronization (runs only once)
// sequelize.sync() // CREATE TABLE
// sequelize.sync({ force: true }) // DROP TABLE + CREATE TABLE
// sequelize.sync({ alter: true }) // BACKUP EXISITING TABLES + DROP TABLE + CREATE TABLE FROM BACKUP DATA


// Testing the connection
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('! DB NOT Connected !'));


module.exports = Todo;