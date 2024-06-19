"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // This async function defines the migration operation to be executed when migrating up (applying the migration).

    // Modify the "email" column of the "Users" table
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING, // Set the column type to STRING
      allowNull: false, // Ensure the column does not allow null values
      unique: true, // Ensure the column values are unique
    });
  },

  async down(queryInterface, Sequelize) {
    // This async function defines the migration operation to be executed when rolling back the migration (reverting the migration).

    // Revert the changes made in "up" function for the "email" column of the "Users" table
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING, // Set the column type back to STRING
    });
  },
};
