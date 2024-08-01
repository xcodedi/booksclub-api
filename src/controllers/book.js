import db from "../models"; // Import the database models
import * as Yup from "yup"; // Import Yup for schema validation

const { Book, Category, Author } = db; // Destructure the Book, Category, and Author models from the database object

class BookController {
  async create(req, res) {
    try {
      // Define a validation schema using Yup
      const schema = Yup.object().shape({
        author_id: Yup.number().required("Author is obligatory"), // Validate author_id as a required number
        category_id: Yup.number().required("Category is obligatory"), // Validate category_id as a required number
        name: Yup.string().required("Name is obligatory"), // Validate name as a required string
        cover_url: Yup.string().required("Cover URL is obligatory"), // Validate cover_url as a required string
        release_date: Yup.date().required("Release date is obligatory"), // Validate release_date as a required date
        pages: Yup.number().required("Pages is obligatory"), // Validate pages as a required number
        synopsis: Yup.string().required("Synopsis is obligatory"), // Validate synopsis as a required string
        highlighted: Yup.boolean().required("Highlighted is obligatory"), // Validate highlighted as a required boolean
      });

      // Validate the request body against the schema
      await schema.validate(req.body, { abortEarly: false });

      const { category_id, author_id } = req.body; // Destructure category_id and author_id from the request body

      // Find the category by primary key (ID)
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" }); // Return 404 if category is not found
      }

      // Find the author by primary key (ID)
      const author = await Author.findByPk(author_id);
      if (!author) {
        return res.status(404).json({ error: "Author not found" }); // Return 404 if author is not found
      }

      // Create a new book with the request body data
      const book = await Book.create({ ...req.body });

      return res.status(201).json(book); // Return the created book with a 201 status code
    } catch (err) {
      return res.status(400).json({ errors: err.errors || err.message }); // Return 400 with validation errors or error message
    }
  }

  async getAll(req, res) {
    const { highlighted } = req.query; // Destructure highlighted from the request query

    // Create a where clause based on the highlighted query parameter
    const whereClause =
      highlighted !== undefined ? { highlighted: highlighted === "true" } : {};

    try {
      // Find all books with the where clause and include author and category data
      const books = await Book.findAll({
        where: whereClause,
        include: [
          { model: Author, as: "author", attributes: ["name"] }, // Include author name
          { model: Category, as: "category", attributes: ["category"] }, // Include category name
        ],
      });

      return res.status(200).json(books); // Return the found books with a 200 status code
    } catch (err) {
      return res.status(500).json({ error: err.message }); // Return 500 with error message
    }
  }
}

export default new BookController(); // Export a new instance of BookController
