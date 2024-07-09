"use strict";
const { Model } = require("sequelize"); // Importing Sequelize's Model class

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    // Defining the Book model that extends Sequelize's Model class

    static associate(models) {
      // Method to define associations with other models
      this.belongsTo(models.Author, {
        foreignKey: "author_id", // Foreign key in the Book table
        as: "author",
      });
      this.belongsTo(models.Category, {
        foreignKey: "category_id", // Foreign key in the Book table
        as: "category",
      });
      this.hasMany(models.UserBook, {
        foreignKey: "book_id", // Foreign key in the UserBook table
        as: "userBooks",
      });
      this.belongsToMany(models.User, {
        through: models.UserBook, // Define the through model for the N:N relationship
        foreignKey: "book_id", // Foreign key in the through model
        as: "users",
      });
    }
  }

  Book.init(
    {
      name: DataTypes.STRING, // Define a 'name' field of type STRING
      cover_url: DataTypes.STRING, // Define a 'cover_url' field of type STRING
      release_date: DataTypes.DATE, // Define a 'release_date' field of type DATE
      pages: DataTypes.INTEGER, // Define a 'pages' field of type INTEGER
      synopsis: DataTypes.TEXT, // Define a 'synopsis' field of type TEXT
      highlighted: DataTypes.BOOLEAN, // Define a 'highlighted' field of type BOOLEAN
    },
    {
      sequelize, // Pass the Sequelize instance
      modelName: "Book", // Define the model name as 'Book'
      tableName: "Books", // Define the table name as 'Books'
    }
  );

  return Book; // Return the Book model
};
