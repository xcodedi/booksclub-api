import { User } from "../models"; // Importing the User model
import * as Yup from "yup"; // Importing Yup for schema validation
import jwt from "jsonwebtoken"; // Importing jsonwebtoken for JWT operations
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing

class UserController {
  async login(req, res) {
    try {
      // Validation schema for the request body using Yup
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email") // Validate email format
          .required("Email is required!"), // Ensure email is present
        password: Yup.string().required("Password is required"), // Ensure password is present
      });

      // Validate the request body against the schema
      await schema.validate(req.body);

      // Find the user based on the email provided in the request
      const user = await User.findOne({ where: { email: req.body.email } });

      // Handle case where user is not found in the database
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password." }); // Unauthorized status if user not found
      }

      // Compare the password provided in the request with the hashed password stored in the database
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password_hash
      );

      // Handle case where the password comparison fails (incorrect password)
      if (!checkPassword) {
        return res.status(401).json({ error: "Invalid email or password." }); // Unauthorized status if password is incorrect
      }

      // Generate JWT token using the user's ID and a secret hash from environment variables
      const token = jwt.sign({ id: user.id }, process.env.JWT_HASH, {
        expiresIn: "30d", // Token expires in 30 days
      });

      // Destructure user object to extract required fields
      const { id, name, email, avatar_url, createdAt } = user;

      // Return the user data (id, name, email, avatar_url, createdAt) and the JWT token in the response
      return res.json({
        user: {
          id,
          name,
          email,
          avatar_url,
          createdAt,
        },
        token, // Include JWT token in the response
      });
    } catch (error) {
      console.error("Error during login:", error); // Log any errors that occur during the login process
      return res.status(400).json({ error: error?.message }); // Return a 400 status with the error message in case of validation or other errors
    }
  }

  async create(req, res) {
    try {
      // Validation schema for creating a new user using Yup
      const schema = Yup.object().shape({
        name: Yup.string()
          .required("Name is required.") // Ensure name is present
          .min(3, "Name must be at least 3 characters long"), // Name must be at least 3 characters long
        email: Yup.string()
          .email("Invalid email") // Validate email format
          .required("Email is required!"), // Ensure email is present
        password: Yup.string()
          .required("Password is required") // Ensure password is present
          .min(6, "Password must be at least 6 characters long."), // Password must be at least 6 characters long
      });

      // Validate the request body against the schema
      await schema.validate(req.body);

      // Check if a user with the same email already exists in the database
      const existedUser = await User.findOne({
        where: { email: req.body.email },
      });

      // Handle case where a user with the same email already exists
      if (existedUser) {
        return res.status(400).json({ error: "User already exists." }); // Bad request status if user already exists
      }

      // Hash the password provided in the request using bcrypt with a salt factor of 8
      const hashPassword = await bcrypt.hash(req.body.password, 8);

      // Create a new instance of the User model with the provided data, storing the hashed password in the database
      const user = new User({
        ...req.body,
        password: "", // Clear plain password from user object
        password_hash: hashPassword, // Store hashed password in the database
      });

      // Save the new user instance to the database
      await user.save();

      // Return the user data in the response
      return res.json({ user });
    } catch (error) {
      console.error("Error during user creation:", error); // Log any errors that occur during the user creation process
      return res.status(400).json({ error: error?.message }); // Return a 400 status with the error message in case of validation or other errors
    }
  }
}

export default new UserController(); // Export an instance of the UserController class
