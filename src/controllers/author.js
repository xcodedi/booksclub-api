import { Author } from "../models"; // Ensure the model name is correct
import * as Yup from "yup"; // Import Yup for schema validation

class AuthorController {
  async create(req, res) {
    // Define an asynchronous create method
    try {
      // Start a try block to handle potential errors
      // Define a validation schema using Yup
      const schema = Yup.object().shape({
        name: Yup.string() // Define 'name' field as a string
          .required("Name is required!") // Make 'name' a required field with a custom error message
          .min(3, "Name must be at least 3 characters long"), // Set a minimum length of 3 characters with a custom error message
        avatar_url: Yup.string().url("Must be a valid URL"), // Define 'avatar_url' field as a string that must be a valid URL
      });

      // Validate the request body using the schema
      await schema.validate(req.body, { abortEarly: false });

      // Create a new author in the database using the validated data
      const newAuthor = await Author.create(req.body);

      // Return the created author as a JSON response
      return res.status(201).json(newAuthor);
    } catch (error) {
      // Catch any validation or other errors
      return res.status(400).json({ error: error.message }); // Return a 400 status with the error message
    }
  }

  async getAll(req, res) {
    // Define an asynchronous findAll method
    try {
      // Check the query string parameter for ordering (ascending or descending)
      const order = req.query.order === "desc" ? "DESC" : "ASC";

      // Fetch all authors from the database, ordered by name
      const authors = await Author.findAll({
        order: [["name", order]],
      });

      // Return the authors as a JSON response
      return res.status(200).json(authors);
    } catch (error) {
      // Catch any errors during the fetch
      return res.status(400).json({ error: error.message }); // Return a 400 status with the error message
    }
  }
}

export default new AuthorController(); // Export an instance of the AuthorController class as the default export
