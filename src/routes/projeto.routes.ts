import { Router } from "express";
import { ProjetoController } from "../controller/projetos.controller";
import { autenticarToken } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

export class projetoRoutes{
    public static bind(): Router{

        const router = Router();

        const controller = new ProjetoController();

        router.get("/projetos", controller.listar);
        router.post("/projetos", autenticarToken, upload.single("thumbnail"), controller.criar);
        router.get("/projetos/:slug", controller.buscarPorSlug);
        router.get("/projetos/id/:id", controller.buscarPorId);
        router.put("/projetos/:id", autenticarToken, controller.atualizar);
        router.delete("/projetos/:id", autenticarToken, controller.deletar);

        return router
    }

}