"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Authors",
      [
        {
          id: 1,
          name: "Cora Coralina",
          avatar_url:
            "https://cdn.pensador.com/img/imagens/pe/ns/pensador_literatura_contemporanea_04.jpg?auto_optimize=low&width=655",
          bio: "Brazilian poet and short story writer, considered one of the main writers of Brazil.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Authors", { id: 1 }, {});
  },
};
