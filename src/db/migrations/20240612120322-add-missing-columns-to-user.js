"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // This async function defines the migration operation to be executed when migrating up (applying the migration).

    // Add new columns to the "Users" table: reset_password_token, reset_password_token_sent_at, and avatar_url
    await Promise.all([
      queryInterface.addColumn("Users", "reset_password_token", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Users", "reset_password_token_sent_at", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Users", "avatar_url", {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    // This async function defines the migration operation to be executed when rolling back the migration (reverting the migration).

    // Remove the columns added in the "up" function from the "Users" table: reset_password_token, reset_password_token_sent_at, and avatar_url
    await Promise.all([
      queryInterface.removeColumn("Users", "reset_password_token"),
      queryInterface.removeColumn("Users", "reset_password_token_sent_at"),
      queryInterface.removeColumn("Users", "avatar_url"),
    ]);
  },
};
