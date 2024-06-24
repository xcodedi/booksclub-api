import { Category } from "../models"; // Import the Category model from the models directory

class CategoryController {
  // Define a new class called CategoryController
  async getAll(req, res) {
    // Define an asynchronous method called getAll, taking request and response objects as parameters
    try {
      // Begin a try block to handle potential errors
      const categories = await Category.findAll({
        // Await the result of calling findAll on the Category model to fetch all categories
        order: [["name", "ASC"]], // Sort the fetched categories in ascending order by the name attribute
      });
      console.log("Categories fetched:", categories); // Log the fetched categories to the console
      return res.json(categories); // Send the fetched categories as a JSON response
    } catch (error) {
      // Catch any errors that occur during the try block
      console.error("Error fetching categories:", error); // Log the error to the console
      return res // Return a response indicating an error occurred
        .status(500) // Set the HTTP status code to 500 (Internal Server Error)
        .json({ error: "An error occurred while fetching categories" }); // Send a JSON response with an error message
    }
  }
}

export default new CategoryController(); // Export an instance of the CategoryController class as the default export
