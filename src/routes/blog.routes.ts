import { Router } from "express";
import { BlogController } from "../controller/blog.controller";
import { autenticarToken } from "../middlewares/auth.middleware";

export class blogRoutes{
    public static bind(): Router{

        const router = Router();

        const controller = new BlogController();

        router.post("/blog", autenticarToken, controller.criar);
        router.put("/blog/:id", autenticarToken, controller.atualizar);
        router.delete("/blog/:id", autenticarToken, controller.deletar);

        return router
    }

}