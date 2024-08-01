"use strict"; // Enforce strict mode

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert a new record into the "Books" table
    return queryInterface.bulkInsert(
      "Books", // Table name
      [
        {
          id: 1, // ID of the book
          author_id: 1, // Foreign key referencing the author
          category_id: 1, // Foreign key referencing the category
          name: "The Sports Gene: Inside the Science of Extraordinary Athletic Performance", // Title of the book
          cover_url: "https://sports.com/the-sports-gene-cover.jpg", // URL to the book's cover image
          release_date: new Date("2013-08-30"), // Release date of the book
          pages: 320, // Number of pages in the book
          // Brief description or summary of the book
          synopsis:
            "An exploration of the role of genetics in sports performance and the science behind extraordinary athletic ability.",
          highlighted: true, // Indicates if the book is highlighted or featured
          createdAt: new Date(), // Timestamp for creation
          updatedAt: new Date(), // Timestamp for last update
        },
      ],
      {} // Options (empty object in this case)
    );
  },

  async down(queryInterface, Sequelize) {
    // Delete the record with ID 1 from the "Books" table
    return queryInterface.bulkDelete("Books", { id: 1 }, {});
  },
};
