import { Request, Response } from "express";
import { ProjetoService } from "../service/projetos.service";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { prismaClient } from "../database/prisma.client";
import { json } from "stream/consumers";

export class ProjetoController {

  public async criar(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descricao, categoria, conteudo, thumbnail } = req.body;

      if (!req.usuario?.id) {
        res.status(401).json({ message: "Usuário não autenticado." });
        return;
      }

      const service = new ProjetoService();

      const projeto = await service.criarProjeto(
        { titulo, descricao, categoria, conteudo, thumbnail},
        req.usuario.id
      );

      res.status(201).json({
        success: true,
        message: "Projeto cadastrado com sucesso.",
        data: projeto,
      });
    } catch (error) {
      return onError(error, res);
    }
  }

  public async listar(req: Request, res: Response): Promise<void>{
    try {
      const service = new ProjetoService();

      const projeto = await service.listarProjeto();

      res.status(200).json({
        sucess: true,
        message: "Projetos listados com sucesso.",
        data: projeto
      });

    } catch (error) {
      return onError(error, res)
    }
}

  public async atualizar(req: Request, res: Response): Promise<void>{
    try {
      const { id } = req.params;

      const { titulo, descricao, conteudo, thumbnail, categoria } = req.body;

      if(!req.usuario?.id){
        throw new HTTPError(401, "Usuário não autenticado");
        return
      }

      const service = new ProjetoService();

      const projetoAtualizado = await service.atualizarProjeto(Number(id), req.usuario.id, {
        titulo, descricao, conteudo, categoria, thumbnail
      })

      res.status(201).json({
        sucess: true,
        mensagem: "Projeto atualizado",
        dados: projetoAtualizado
      })

    } catch (error) {
      onError(error, res)
    }
  }

  public async deletar(req: Request, res: Response): Promise<void>{
    try {
      const { id } = req.params;

      if(!req.usuario?.id){
        throw new HTTPError(401, "Usuário não autenticado");
        return
      }

      const service = new ProjetoService();

      await service.deletarProjeto( Number(id), req.usuario.id )

      res.status(200).json({
        sucess: true,
        mensagem: "Projeto deletado",
      })

    } catch (error) {
      onError(error, res)
    }
  }

}

