"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Change the "synopsis" column type to TEXT in the "Books" table
    await queryInterface.changeColumn("Books", "synopsis", {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the "synopsis" column type back to STRING in the "Books" table
    await queryInterface.changeColumn("Books", "synopsis", {
      type: Sequelize.STRING,
    });
  },
};
