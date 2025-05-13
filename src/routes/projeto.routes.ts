import { Router } from "express";
import { ProjetoController } from "../controller/projetos.controller";
import { autenticarToken } from "../middlewares/auth.middleware";

export class projetoRoutes{
    public static bind(): Router{

        const router = Router();

        const controller = new ProjetoController();

        router.get("/projetos", controller.listar);
        router.post("/projetos", autenticarToken, controller.criar);
        router.put("/projetos/:id", autenticarToken, controller.atualizar);
        router.delete("/projetos/:id", autenticarToken, controller.deletar);

        return router
    }

}