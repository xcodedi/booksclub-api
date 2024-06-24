"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Define the migration operation to be executed when migrating up (applying the migration).

    // Create the "Authors" table with columns: id, name, avatar_url, createdAt, updatedAt
    await queryInterface.createTable("Authors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar_url: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    // Define the migration operation to be executed when rolling back the migration (reverting the migration).

    // Drop (delete) the "Authors" table
    await queryInterface.dropTable("Authors");
  },
};
