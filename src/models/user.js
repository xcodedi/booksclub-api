"use strict";
const { Model } = require("sequelize"); // Importing Sequelize's Model class

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Defining the User model that extends Sequelize's Model class

    static associate(models) {} // Static method to define associations with other models
  }

  User.init(
    {
      name: DataTypes.STRING, // Define a 'name' field of type STRING
      email: DataTypes.STRING, // Define an 'email' field of type STRING
      password: DataTypes.STRING, // Define a 'password' field of type STRING
      password_hash: DataTypes.STRING, // Define a 'password_hash' field of type STRING
      reset_password_token: DataTypes.STRING, // Define a 'reset_password_token' field of type STRING
      reset_password_token_sent_at: DataTypes.DATE, // Define a 'reset_password_token_sent_at' field of type DATE
      avatar_url: DataTypes.STRING, // Define an 'avatar_url' field of type STRING
    },
    {
      sequelize, // Pass the Sequelize instance
      modelName: "User", // Define the model name as 'User'
    }
  );

  return User; // Return the User model
};
