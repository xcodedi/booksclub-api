import { Book, Author } from "../models"; // Import the Book and Author models from the models directory
import { Op } from "sequelize"; // Import the Sequelize Op for query operations

class SearchController {
  async get(req, res) {
    try {
      const { name } = req.query; // Destructure the name parameter from the request query

      if (!name) {
        return res
          .status(400)
          .json({ error: "Name query parameter is required" }); // Return 400 if the name query parameter is not provided
      }

      // Find all authors where the name matches the query parameter using a case-insensitive like operator
      const authors = await Author.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      // Find all books where the name matches the query parameter using a case-insensitive like operator
      const books = await Book.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      // Return the found authors and books
      res.json({ authors, books });
    } catch (error) {
      // Return 500 if there is an internal server error
      res.status(500).json({ error: error.message });
    }
  }
}

export default new SearchController(); // Export a new instance of SearchController
