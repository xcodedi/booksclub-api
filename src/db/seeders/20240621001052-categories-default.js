"use strict"; // Enforce strict mode to catch common coding errors and unsafe actions

/** @type {import('sequelize-cli').Migration} */ // Type annotation for Sequelize CLI migration

module.exports = {
  // Export the migration configuration as a module
  async up(queryInterface, Sequelize) {
    // Define an asynchronous function named 'up' for applying the migration
    return queryInterface.bulkInsert("Categories", [
      // Use queryInterface to bulk insert records into the "Categories" table
      {
        name: "sports", // Set the name of the category to "sports"
        highlighted: false, // Set the highlighted attribute to false
        createdAt: new Date(), // Set the createdAt attribute to the current date and time
        updatedAt: new Date(), // Set the updatedAt attribute to the current date and time
      },
      {
        name: "cooking", // Set the name of the category to "cooking"
        highlighted: false, // Set the highlighted attribute to false
        createdAt: new Date(), // Set the createdAt attribute to the current date and time
        updatedAt: new Date(), // Set the updatedAt attribute to the current date and time
      },
      {
        name: "fiction", // Set the name of the category to "fiction"
        highlighted: false, // Set the highlighted attribute to false
        createdAt: new Date(), // Set the createdAt attribute to the current date and time
        updatedAt: new Date(), // Set the updatedAt attribute to the current date and time
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Define an asynchronous function named 'down' for reverting the migration
    // Commands to revert seed if necessary
    return queryInterface.bulkDelete("Categories", null, {}); // Use queryInterface to bulk delete all records from the "Categories" table
  },
};
