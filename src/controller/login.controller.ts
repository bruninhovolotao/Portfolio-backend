import { Request, Response} from "express";
import { loginService } from "../service/login.service";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";

export class loginController{

    public async siginup(req: Request, res: Response){
        try {
            const service = new loginService();

            const resultado = await service.signUp(req.body);

            res.status(201).json({
                sucess: true,
                message: "usuário criado com sucesso",
                dados: resultado,
            })

        } catch (error) {
            onError(error, res);
        }
    }

    public async login(req:Request, res: Response): Promise<void> {
        try {
            const { emailOuUsername, senha } = req.body;

            // if(!emailOuUsername || !senha){
            //     throw new HTTPError(400, "Email/Username ou Senha são obrigatórios.")
            // }

            const service = new loginService();
            const resultado = await service.login( { emailOuUsername, senha })

            res.status(201).json({
                sucess: true,
                message: "usuário logado com sucesso",
                dados: resultado
            })
            
        } catch (error) {
            onError(error, res)            
        }
    }

}