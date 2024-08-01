"use strict"; // Enforce strict mode

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert a new record into the "Authors" table
    return queryInterface.bulkInsert(
      "Authors", // Table name
      [
        {
          id: 1, // ID of the author
          name: "Cora Coralina", // Name of the author
          // URL to the author's avatar image
          avatar_url:
            "https://cdn.pensador.com/img/imagens/pe/ns/pensador_literatura_contemporanea_04.jpg?auto_optimize=low&width=655",
          bio: "Brazilian poet and short story writer, considered one of the main writers of Brazil.", // Biography of the author
          createdAt: new Date(), // Timestamp for creation
          updatedAt: new Date(), // Timestamp for last update
        },
      ],
      {} // Options (empty object in this case)
    );
  },

  async down(queryInterface, Sequelize) {
    // Delete the record with ID 1 from the "Authors" table
    return queryInterface.bulkDelete("Authors", { id: 1 }, {});
  },
};
