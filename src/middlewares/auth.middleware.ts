import { Request, Response, NextFunction } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { loginService } from "../service/login.service";

export async function autenticarToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new HTTPError(401, "Token de autenticação não informado.");
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new HTTPError(401, "Token de autenticação mal formatado.");
    }

    const service = new loginService();
    const userFound = await service.getByToken(token);

    if (!userFound) {
      throw new HTTPError(401, "Token de autenticação inválido.");
    }

    req.usuario = {
      id: userFound.id,
      nome: userFound.nome,
      email: userFound.email,
      username: userFound.username,
    };

    return next();
  } catch (error) {
    return onError(error, res);
  }
}
