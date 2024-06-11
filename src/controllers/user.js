import { User } from "../models";

class UserController {
  async create(req, res) {
    try {
      const user = new User({
        name: "Diego Meira",
        email: "diego@teste.com.br",
        password: "teste123",
        password_hash: "teste1233",
      });

      await user.save();
      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ error: "Error creating user" });
    }
  }
}

export default new UserController();
