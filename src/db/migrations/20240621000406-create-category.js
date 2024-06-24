"use strict"; // Enforce strict mode to catch common coding errors and unsafe actions

/** @type {import('sequelize-cli').Migration} */ // Type annotation for Sequelize CLI migration

module.exports = {
  // Export the migration configuration as a module
  async up(queryInterface, Sequelize) {
    // Define an asynchronous function named 'up' for applying the migration
    await queryInterface.createTable("Categories", {
      // Use queryInterface to create a table named "Categories"
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
        allowNull: false, // The 'name' column cannot be null
      },
      highlighted: {
        // Define the 'highlighted' column
        type: Sequelize.BOOLEAN, // The 'highlighted' column is of type BOOLEAN
        defaultValue: false, // The default value for 'highlighted' is false
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
    await queryInterface.dropTable("Categories"); // Use queryInterface to drop the "Categories" table
  },
};
