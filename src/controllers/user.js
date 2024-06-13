import { User } from "../models"; // Importa o modelo User definido em ../models
import * as yup from "yup"; // Importa yup para validação de dados
import bcrypt from "bcrypt"; // Importa bcrypt para hash de senhas

class UserController {
  async create(req, res) {
    // Define o esquema de validação para os dados do usuário
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
      // Validar os dados do usuário
      await schema.validate(req.body, { abortEarly: false });

      // Verificar se o usuário já existe pelo e-mail
      const existingUser = await User.findOne({
        where: { email: req.body.email },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      // Hash da senha
      const password_hash = await bcrypt.hash(req.body.password, 8);
      const user = new User({
        ...req.body,
        password: "",
        password_hash: password_hash,
      });

      // Salvar o usuário no banco de dados
      await user.save();
      return res.json({ user });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors = err.inner.reduce((errors, error) => {
          errors[error.path] = error.message;
          return errors;
        }, {});
        return res.status(400).json({ errors: validationErrors });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
