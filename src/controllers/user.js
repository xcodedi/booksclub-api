import { User } from "../models";
import * as yup from "yup";
import bcrypt from "bcrypt";

class UserController {
  async create(req, res) {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Name is obligatory")
        .min(3, "Name must contain at least 3 characters"),
      email: yup
        .string()
        .email("Invalid email")
        .required("Email is obligatory"),
      password: yup
        .string()
        .required("Password is obligatory")
        .min(6, "Password must contain at least 6 characters"),
    });

    try {
      await schema.validate(req.body);

      const password_hash = await bcrypt.hash(req.body.password, 8);
      const user = new User({
        ...req.body,
        password: "",
        password_hash: password_hash,
      });

      await user.save();
      return res.json({ user });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ error: err.errors });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
