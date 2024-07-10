import { Book, Author } from "../models";
import { Op } from "sequelize";

class SearchController {
  async get(req, res) {
    try {
      const { name } = req.query;

      if (!name) {
        return res
          .status(400)
          .json({ error: "Name query parameter is required" });
      }

      const authors = await Author.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      const books = await Book.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      res.json({ authors, books });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new SearchController();
