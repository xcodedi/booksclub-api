"use strict"; // Enforce strict mode to catch common coding errors and unsafe actions

/** @type {import('sequelize-cli').Migration} */ // Type annotation for Sequelize CLI migration

module.exports = {
  // Export the migration configuration as a module
  async up(queryInterface, Sequelize) {
    // Define an asynchronous function named 'up' for applying the migration
    // This async function defines the migration operation to be executed when migrating up (applying the migration).

    // Create the "Users" table with columns: id, name, email, password, password_hash, createdAt, updatedAt
    await queryInterface.createTable("Users", {
      // Use queryInterface to create a table named "Users"
      id: {
        // Define the 'id' column
        allowNull: false, // The 'id' column cannot be null
        autoIncrement: true, // The 'id' column value will auto-increment
        primaryKey: true, // The 'id' column is the primary key for the table
        type: Sequelize.INTEGER, // The 'id' column is of type INTEGER
      },
      name: {
        // Define the 'name' column
        type: Sequelize.STRING, // The 'name' column is of type STRING
      },
      email: {
        // Define the 'email' column
        type: Sequelize.STRING, // The 'email' column is of type STRING
      },
      password: {
        // Define the 'password' column
        type: Sequelize.STRING, // The 'password' column is of type STRING
      },
      password_hash: {
        // Define the 'password_hash' column
        type: Sequelize.STRING, // The 'password_hash' column is of type STRING
      },
      createdAt: {
        // Define the 'createdAt' column
        allowNull: false, // The 'createdAt' column cannot be null
        type: Sequelize.DATE, // The 'createdAt' column is of type DATE
      },
      updatedAt: {
        // Define the 'updatedAt' column
        allowNull: false, // The 'updatedAt' column cannot be null
        type: Sequelize.DATE, // The 'updatedAt' column is of type DATE
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Define an asynchronous function named 'down' for reverting the migration
    // This async function defines the migration operation to be executed when rolling back the migration (reverting the migration).

    // Drop (delete) the "Users" table
    await queryInterface.dropTable("Users"); // Use queryInterface to drop the "Users" table
  },
};
