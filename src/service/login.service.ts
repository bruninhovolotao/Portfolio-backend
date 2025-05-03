import { Usuario } from "@prisma/client";
import { loginDTO, usuarioDTO } from "../dto/login.dto";
import { prismaClient } from "../database/prisma.client";
import bcrypt from "bcrypt";
import { HTTPError } from "../utils/http.error";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

type UsuarioParcial = Omit<Usuario, "senha">;

export class loginService {
    public async signUp(dados: usuarioDTO): Promise<UsuarioParcial> {
        const { nome, email, username, senha } = dados;

        const usuarioExistente = await prismaClient.usuario.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if(usuarioExistente){
            throw new HTTPError(409, "E-mail ou Usuário já existe.")
        }

        const senhaCriptografada = await bcrypt.hash(senha,10)

        const novoUsuario = await prismaClient.usuario.create({
            data: {
                nome,
                email,
                username,
                senha: senhaCriptografada
            }
        });

        const { senha: _, ...usuarioSemSenha } = novoUsuario;
        return usuarioSemSenha

    }

    public async login(dados: loginDTO): Promise< {token: string, usuario: object} > {
        const { emailOuUsername, senha } = dados

        let usuario = await prismaClient.usuario.findFirst({
            where:{
                OR: [
                    { email: emailOuUsername },
                    { username: emailOuUsername}
                    ]
                }
        })

        if(!usuario){
            throw new HTTPError(401, "E-mail ou Usuário não encontrado")
        }

        const senhaValida = await bcrypt.compare( senha, usuario.senha)

        if(!senhaValida){
            throw new HTTPError(401, "Senha inválida")
        }

        // const token = jwt.sign(
        //     { id: usuario.id },
        //     process.env.JWT_SECRET || "key_secret",
        //     { expiresIn: "1h" }
        // );

        const token = randomUUID();

        usuario = await prismaClient.usuario.update({
            where: { id: usuario.id },
            data: { authToken: token },
        });

        const { senha: _, ...usuarioSemSenha } = usuario;

        return { usuario: usuarioSemSenha, token}

    }

    public async getByToken(authToken: string): Promise<Omit<Usuario, "password"> | null>{
        const user = await prismaClient.usuario.findFirst({
            where:{ authToken },
        });

        return user;
    }
  
}