import { Router } from "express"; // Import the Router class from the Express library
import UserController from "../controllers/user"; // Import the UserController from the controllers directory
import authMiddleware from "../middlewares/auth"; // Import the authentication middleware
import CategoryController from "../controllers/category"; // Import the CategoryController from the controllers directory
import AuthorController from "../controllers/author"; // Import the AuthorController from the controllers directory
import BookController from "../controllers/book"; // Import the BookController from the controllers directory
import UserBookController from "../controllers/userbook"; // Import the UserBookController from the controllers directory
import SearchController from "../controllers/search";

const routes = Router(); // Create a new instance of Router

// Unauthenticated routes
routes.post("/user", UserController.create); // Define a POST route for creating a new user
routes.post("/login", UserController.login); // Define a POST route for user login
routes.post("/forgotpassword", UserController.forgotPassword); // Define a POST route for requesting a password reset link
routes.post("/resetpassword", UserController.resetPassword); // Define a POST route for resetting the password

// Authenticated routes
routes.use(authMiddleware); // Use the authentication middleware to protect the following routes
routes.get("/user", UserController.getuser); // Define a GET route for retrieving user information
routes.get("/category", CategoryController.getAll); // Define a GET route for retrieving all categories
routes.post("/author", AuthorController.create); // Define a POST route for creating a new author
routes.get("/author", AuthorController.getAll); // Define a GET route for retrieving all authors
routes.post("/book", BookController.create); // Define a POST route for creating a new book
routes.get("/book", BookController.getAll); // Define a GET route for retrieving all books
routes.post("/userbook", UserBookController.create); // Define a POST route for creating a new user-book association
routes.get("/userbook", UserBookController.getAll); // Define a GET route for retrieving all user-book associations
routes.delete("/userbook/:userBookId", UserBookController.delete); // Define a DELETE route for deleting a user-book association
routes.get("/search", SearchController.get); // Define a GET route for searching
routes.put("/user", UserController.update); // Define a PUT route for updating user information
routes.put("/user/avatar", UserController.updateAvatar); // Define a PUT route for updating the user avatar

export default routes; // Export the configured routes as the default export
