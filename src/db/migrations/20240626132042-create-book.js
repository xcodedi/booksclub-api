"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the "Books" table with the following columns and constraints
    await queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true, // Automatically increment the id
        primaryKey: true, // Set id as the primary key
        type: Sequelize.INTEGER, // Set the type of id as INTEGER
      },
      author_id: {
        type: Sequelize.INTEGER, // Set the type of author_id as INTEGER
        references: { model: "Authors", key: "id" }, // Foreign key reference to the "Authors" table
        onUpdate: "CASCADE", // Update author_id on update of the referenced "Authors" id
        onDelete: "SET NULL", // Set author_id to NULL on delete of the referenced "Authors" id
        allowNull: true, // Allow author_id to be NULL
      },
      category_id: {
        type: Sequelize.INTEGER, // Set the type of category_id as INTEGER
        references: { model: "Categories", key: "id" }, // Foreign key reference to the "Categories" table
        onUpdate: "CASCADE", // Update category_id on update of the referenced "Categories" id
        onDelete: "SET NULL", // Set category_id to NULL on delete of the referenced "Categories" id
        allowNull: true, // Allow category_id to be NULL
      },
      name: {
        type: Sequelize.STRING, // Set the type of name as STRING
      },
      cover_url: {
        type: Sequelize.STRING, // Set the type of cover_url as STRING
      },
      release_date: {
        type: Sequelize.DATE, // Set the type of release_date as DATE
      },
      pages: {
        type: Sequelize.INTEGER, // Set the type of pages as INTEGER
      },
      synopsis: {
        type: Sequelize.STRING, // Set the type of synopsis as STRING
      },
      highlighted: {
        type: Sequelize.BOOLEAN, // Set the type of highlighted as BOOLEAN
      },
      createdAt: {
        allowNull: false, // Do not allow createdAt to be NULL
        type: Sequelize.DATE, // Set the type of createdAt as DATE
      },
      updatedAt: {
        allowNull: false, // Do not allow updatedAt to be NULL
        type: Sequelize.DATE, // Set the type of updatedAt as DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop the "Books" table
    await queryInterface.dropTable("Books");
  },
};
