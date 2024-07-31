import { User, Book, UserBook } from "../models"; // Importing models User, Book, and UserBook

class UserBookController {
  async create(req, res) {
    try {
      // Schema validation using yup (not shown here for brevity)
      // Ensure book_id is a number and required

      // Finding the user by its primary key (req.userId)
      const user = await User.findByPk(req.userId);
      if (!user) {
        // If user is not found, return a 404 error
        return res.status(404).json({ error: "User not found" });
      }

      // Destructuring book_id from request body
      const { book_id } = req.body;

      // Check if the user has already added this book
      const existingUserBook = await UserBook.findOne({
        where: {
          user_id: req.userId,
          book_id,
        },
      });

      if (existingUserBook) {
        // If the user has already added this book, return a 400 error
        return res
          .status(400)
          .json({ error: "This book has already been added by the user" });
      }

      // Finding the book by its primary key (book_id)
      const book = await Book.findByPk(book_id);
      if (!book) {
        // If book is not found, return a 404 error
        return res.status(404).json({ error: "Book not found" });
      }

      // Creating a new UserBook entry associating user_id and book_id
      const userBook = new UserBook({
        user_id: req.userId,
        book_id,
      });

      await userBook.save();

      // Returning the created UserBook entry as JSON response
      return res.json(userBook);
    } catch (error) {
      // Catching any validation errors or database errors
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      // Find all UserBooks where user_id matches req.userId
      const userBooks = await UserBook.findAll({
        where: {
          user_id: req.userId,
        },
        include: [{ model: Book, as: "book", attibutes: ["author"] }], // Include the Book model with alias 'book'
      });

      // Return the list of UserBooks as JSON response
      return res.json(userBooks);
    } catch (error) {
      // Catch any errors and return a 500 status with an error message
      return res.status(500).json({ error: "Failed to fetch UserBooks" });
    }
  }

  async delete(req, res) {
    try {
      const { userBookId } = req.params; // Capture the ID of the UserBook to be deleted

      // Check if the UserBook exists
      const userBook = await UserBook.findOne({
        where: {
          id: userBookId,
          user_id: req.userId, // Ensure the UserBook belongs to the logged-in user
        },
      });

      if (!userBook) {
        // If the UserBook does not exist, return a 404 error
        return res.status(404).json({ error: "UserBook not found" });
      }

      // Delete the UserBook
      await userBook.destroy();

      // Return a success message
      return res.json({ message: "UserBook deleted successfully" });
    } catch (error) {
      // Catch validation errors or database errors
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserBookController();
