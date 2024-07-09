"use strict";
const { Model } = require("sequelize"); // Importing Sequelize's Model class

module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    // Defining the UserBook model that extends Sequelize's Model class

    static associate(models) {
      // Method to define associations with other models
      this.belongsTo(models.User, {
        foreignKey: "user_id", // Foreign key in the UserBook table pointing to User
        as: "user", // Alias for the association
      });
      this.belongsTo(models.Book, {
        foreignKey: "book_id", // Foreign key in the UserBook table pointing to Book
        as: "book", // Alias for the association
      });
    }
  }

  UserBook.init(
    {
      user_id: DataTypes.INTEGER, // Define a 'user_id' field of type INTEGER
      book_id: DataTypes.INTEGER, // Define a 'book_id' field of type INTEGER
    },
    {
      sequelize, // Pass the Sequelize instance
      modelName: "UserBook", // Define the model name as 'UserBook'
    }
  );

  return UserBook; // Return the UserBook model
};
