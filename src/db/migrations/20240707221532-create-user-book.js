"use strict"; // Enforce strict mode

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the "UserBooks" table with the specified columns
    await queryInterface.createTable("UserBooks", {
      id: {
        allowNull: false, // The column "id" cannot be null
        autoIncrement: true, // The value will automatically increment
        primaryKey: true, // Set the column as the primary key
        type: Sequelize.INTEGER, // Define the column type as an integer
      },
      user_id: {
        references: { model: "Users", key: "id" }, // Foreign key reference to the "Users" table
        onUpdate: "CASCADE", // Update the foreign key when the referenced key is updated
        onDelete: "CASCADE", // Delete the foreign key when the referenced key is deleted
        allowNull: false, // The column "user_id" cannot be null
        type: Sequelize.INTEGER, // Define the column type as an integer
      },
      book_id: {
        references: { model: "Books", key: "id" }, // Foreign key reference to the "Books" table
        onUpdate: "CASCADE", // Update the foreign key when the referenced key is updated
        onDelete: "CASCADE", // Delete the foreign key when the referenced key is deleted
        allowNull: false, // The column "book_id" cannot be null
        type: Sequelize.INTEGER, // Define the column type as an integer
      },
      createdAt: {
        allowNull: false, // The column "createdAt" cannot be null
        type: Sequelize.DATE, // Define the column type as a date
      },
      updatedAt: {
        allowNull: false, // The column "updatedAt" cannot be null
        type: Sequelize.DATE, // Define the column type as a date
      },
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop the "UserBooks" table
    await queryInterface.dropTable("UserBooks");
  },
};
