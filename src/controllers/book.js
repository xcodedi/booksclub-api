import db from "../models";
import * as Yup from "yup";

const { Book, Category, Author } = db;

class BookController {
  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        author_id: Yup.number().required("Author is obligatory"),
        category_id: Yup.number().required("Category is obligatory"),
        name: Yup.string().required("Name is obligatory"),
        cover_url: Yup.string().required("Cover URL is obligatory"),
        release_date: Yup.date().required("Release date is obligatory"),
        pages: Yup.number().required("Pages is obligatory"),
        synopsis: Yup.string().required("Synopsis is obligatory"),
        highlighted: Yup.boolean().required("Highlighted is obligatory"),
      });

      await schema.validate(req.body, { abortEarly: false });

      const { category_id, author_id } = req.body;

      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const author = await Author.findByPk(author_id);
      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }

      const book = await Book.create({ ...req.body });

      return res.status(201).json(book);
    } catch (err) {
      return res.status(400).json({ errors: err.errors || err.message });
    }
  }

  async getAll(req, res) {
    const { highlighted } = req.query;

    const whereClause =
      highlighted !== undefined ? { highlighted: highlighted === "true" } : {};

    try {
      const books = await Book.findAll({
        where: whereClause,
        include: [
          { model: Author, as: "author", attributes: ["name"] },
          { model: Category, as: "category", attributes: ["category"] },
        ],
      });

      return res.status(200).json(books);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new BookController();
