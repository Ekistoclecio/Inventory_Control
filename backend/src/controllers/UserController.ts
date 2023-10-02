import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Not } from "typeorm";

// Classe responsável pelas funções de tratamento das rotas relacionadas aos usuários.
export class UserController {
  // Função que realiza o cadastro de um novo usuário, garantindo que o email cadastrado seja único por usuário.
  async create(req: Request, res: Response) {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ message: "Requisição inválida" });
    }

    try {
      const uniqueEmailValidation = await userRepository.findOneBy({ email });
      if (uniqueEmailValidation) {
        return res
          .status(400)
          .json({ message: "O e-mail informado ja foi cadastrado" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        email,
        password: hashPassword,
      });

      await userRepository.save(newUser);

      return res
        .status(201)
        .json({ message: "Usuario cadastrado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  // Função responsável por realizar o login do usuário, retornando algumas informações do usuário e um token de autenticação.
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Requisição inválida" });
    }

    try {
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return res.status(400).json({ message: "E-mail ou senha inválidos" });
      }

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (!verifyPassword) {
        return res.status(400).json({ message: "E-mail ou senha inválidos" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS, {
        expiresIn: "8h",
      });

      return res.status(200).json({
        token,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      });
    } catch (error) {
      return res.status(500);
    }
  }

  // Função responsável por fazer a alteração dos dados do usuário (name, lastName e email).
  async changeUserData(req: Request, res: Response) {
    const { name, lastName, email } = req.body;

    if (!name || !lastName || !email) {
      return res.status(400).json({ message: "Requisição inválida" });
    }

    try {
      const validateUniqueEmail = await userRepository.findOneBy({
        email,
        id: Not(req.userId),
      });

      if (validateUniqueEmail) {
        return res.status(400).json({
          message: "O e-mail digitado ja esta em uso!",
          field: "email",
        });
      }

      const result = await userRepository.update(
        {
          id: req.userId,
        },
        {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
          email,
        }
      );

      if (result.affected) {
        return res
          .status(200)
          .json({ message: "Dados do usuário atualizados com sucesso!" });
      } else {
        return res.status(400).json({ message: "Usuario não encontrado!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  // Função responsável por alterar a senha do usuário.
  async changeUserPassword(req: Request, res: Response) {
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      return res.status(400).json({ message: "Requisição inválida" });
    }

    try {
      const user = await userRepository.findOneBy({ id: req.userId });

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (!verifyPassword) {
        return res
          .status(400)
          .json({ message: "A senha digitada está incorreta!" });
      }

      const hashNewPassword = await bcrypt.hash(newPassword, 10);

      const result = await userRepository.update(
        {
          id: req.userId,
        },
        {
          password: hashNewPassword,
        }
      );
      if (result.affected > 0) {
        return res
          .status(200)
          .json({ message: "Senha atualizada com sucesso!" });
      } else {
        return res.status(400).json({ message: "Usuario não encontrado!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  // Função responsável por retornar uma lista de produtos do usuário com base na paginação pedida pelo cliente.
  async getProducts(req: Request, res: Response) {
    const { page } = req.params;

    if (!page) {
      return res.status(400).json({ message: "Requisição inválida" });
    }

    try {
      const user = await userRepository.findOne({
        where: {
          id: req.userId,
        },
        relations: {
          products: true,
        },
      });

      let partialProductsArray = [];

      for (let i = parseInt(page) * 25; i < parseInt(page) * 25 + 25; i++) {
        if (user.products[i]) {
          partialProductsArray.push(user.products[i]);
        } else {
          break;
        }
      }

      return res.status(200).json(partialProductsArray);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
}
