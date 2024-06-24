import { Router } from "express"; // Import the Router class from the Express library
import UserController from "../controllers/user"; // Import the UserController from the controllers directory (ensure the path is correct)
import authMiddleware from "../middlewares/auth"; // Import the authentication middleware
import CategoryController from "../controllers/category"; // Import the CategoryController from the controllers directory

const routes = new Router(); // Create a new instance of Router

// unauthenticated routes
routes.post("/user", UserController.create); // Define a POST route for creating a new user
routes.post("/login", UserController.login); // Define a POST route for user login
routes.post("/forgotpassword", UserController.forgotPassword); // Define a POST route for requesting a password reset link
routes.post("/resetpassword", UserController.resetPassword); // Define a POST route for resetting the password

// authenticated routes
routes.use(authMiddleware); // Use the authentication middleware to protect the following routes
routes.get("/user/", UserController.getuser); // Define a GET route for retrieving user information
routes.get("/category", CategoryController.getAll); // Define a GET route for retrieving all categories

export default routes; // Export the configured routes as the default export
