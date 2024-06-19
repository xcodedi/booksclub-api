"use strict";

const fs = require("fs"); // Importing Node.js file system module
const path = require("path"); // Importing Node.js path module
const Sequelize = require("sequelize"); // Importing Sequelize ORM
const process = require("process"); // Importing Node.js process module
const basename = path.basename(__filename); // Extracting the base name of the current file
const env = process.env.NODE_ENV || "development"; // Setting the environment based on NODE_ENV or defaulting to 'development'
const config = require(__dirname + "/../config/config.json")[env]; // Loading Sequelize configuration from config file based on environment
const db = {}; // Initializing an empty object to hold Sequelize models

let sequelize; // Declaring a variable to hold the Sequelize instance

// Creating a Sequelize instance based on config settings
if (config.use_env_variable) {
  // Using environment variable for database connection (e.g., for production)
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Using config parameters (e.g., for development)
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Reading files in the current directory (likely where Sequelize model definitions are stored)
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && // Exclude hidden files
      file !== basename && // Exclude the current file (index.js)
      file.slice(-3) === ".js" && // Select only JavaScript files
      file.indexOf(".test.js") === -1 // Exclude test files if any
    );
  })
  .forEach((file) => {
    // Importing each model file
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model; // Adding each model to the db object
  });

// Associating models if an 'associate' method is defined in the model
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Adding the Sequelize instance to the db object
db.Sequelize = Sequelize; // Adding the Sequelize library to the db object

module.exports = db; // Exporting the db object (including all models and Sequelize instance)
