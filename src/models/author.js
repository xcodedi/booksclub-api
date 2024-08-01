"use strict";

// Import the Model class from Sequelize
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  // Define the Author model class extending from Sequelize's Model
  class Author extends Model {
    // Define any associations for the Author model
    static associate(models) {
      // Currently, there are no associations defined
    }
  }

  // Initialize the Author model with its schema and options
  Author.init(
    {
      // Define the attributes of the Author model
      name: DataTypes.STRING, // The name of the author
      avatar_url: DataTypes.STRING, // URL to the author's avatar image
      bio: DataTypes.TEXT, // A text field for the author's biography
    },
    {
      sequelize, // The Sequelize instance used to initialize the model
      modelName: "Author", // The name of the model
    }
  );

  // Return the Author model
  return Author;
};
