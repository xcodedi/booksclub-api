"use strict"; // Enforce strict mode

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add a new column "bio" to the "Authors" table
    await queryInterface.addColumn("Authors", "bio", {
      type: Sequelize.TEXT, // Define the column type as TEXT
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the "bio" column from the "Authors" table
    await queryInterface.removeColumn("Authors", "bio");
  },
};
