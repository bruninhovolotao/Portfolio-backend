import { Router } from "express";
import { loginController } from "../controller/login.controller";

export class loginRoutes{
    public static bind(): Router{
        const router = Router();
        const controller = new loginController();

        router.post("/sign-up", controller.siginup);
        router.post("/login", controller.login);

        return router;
    }


}