"use strict"; // Enforce strict mode to catch common coding errors and unsafe actions

const { Model } = require("sequelize"); // Import the Model class from the Sequelize library

module.exports = (sequelize, DataTypes) => {
  // Export a function that defines the Category model
  class Category extends Model {
    // Define a new class called Category that extends Sequelize's Model class
    static associate(models) {} // Define an associate method for future associations with other models (currently empty)
  }

  Category.init(
    // Initialize the Category model with its attributes and options
    {
      name: DataTypes.STRING, // Define a 'name' attribute of type STRING
      highlighted: DataTypes.BOOLEAN, // Define a 'highlighted' attribute of type BOOLEAN
    },
    {
      sequelize, // Pass the sequelize instance
      modelName: "Category", // Set the model name to 'Category'
    }
  );

  return Category; // Return the defined Category model
};
