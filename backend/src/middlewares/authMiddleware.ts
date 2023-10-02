import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/UserRepository";

type JwtPayload = {
  id: string;
};

// Middleware responsável por realizar a autenticação do usuário, verificando se o token recebido é um token de sessão válido para este usuário.
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado!" });
  }

  try {
    const token = authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_PASS) as JwtPayload;
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    req.userId = id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Não autorizado!" });
  }
};
