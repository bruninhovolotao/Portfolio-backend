import { Request, Response } from "express";
import { BlogService } from "../service/blog.service";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { prismaClient } from "../database/prisma.client";

export class BlogController {

    public async criar(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descricao, categoria, conteudo, thumbnail } = req.body;

      if (!req.usuario?.id) {
        res.status(401).json({ message: "Usuário não autenticado." });
        return;
      }

      const service = new BlogService();

      const artigo = await service.criarArtigo(
        { titulo, descricao, categoria, conteudo, thumbnail},
        req.usuario.id
      );

      res.status(201).json({
        success: true,
        message: "Artigo cadastrado com sucesso.",
        data: artigo,
      });
    } catch (error) {
      return onError(error, res);
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

      const service = new BlogService();

      const artigoAtualizado = await service.atualizarArtigo(Number(id), req.usuario.id, {
        titulo, descricao, conteudo, categoria, thumbnail
      })

      res.status(201).json({
        sucess: true,
        mensagem: "Artigo atualizado",
        dados: artigoAtualizado
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

      const service = new BlogService();

      await service.deletarArtigo( Number(id), req.usuario.id )

      res.status(200).json({
        sucess: true,
        mensagem: "Artigo deletado",
      })

    } catch (error) {
      onError(error, res)
    }
  }

}

