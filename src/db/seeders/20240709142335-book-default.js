"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Books",
      [
        {
          id: 1,
          author_id: 1,
          category_id: 1,
          name: "The Sports Gene: Inside the Science of Extraordinary Athletic Performance",
          cover_url: "https://sports.com/the-sports-gene-cover.jpg",
          release_date: new Date("2013-08-30"),
          pages: 320,
          synopsis:
            "An exploration of the role of genetics in sports performance and the science behind extraordinary athletic ability.",
          highlighted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Books", { id: 1 }, {});
  },
};
