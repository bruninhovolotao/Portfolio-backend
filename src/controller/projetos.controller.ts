import { Request, Response } from "express";
import { ProjetoService } from "../service/projetos.service";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { prismaClient } from "../database/prisma.client";


export class ProjetoController {

  public async criar(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descricao, conteudo, categoria, thumbnail } = req.body;
      // const conteudo = req.body.conteudo ? JSON.parse(req.body.conteudo) : null;
      const urlBase = `${req.protocol}://${req.get("host")}`;
      const urlThumbnail = req.file ? `/uploads/${req.file.filename}` : null;
      const thumbnailCompleto = thumbnail?.startsWith("http") ? thumbnail : `${urlBase}${urlThumbnail}`;

      if (!titulo || !categoria) {
        res.status(400).json({ message: "Título e categoria são obrigatórios." });
        return;
      }

      if (!req.usuario?.id) {
        res.status(401).json({ message: "Usuário não autenticado." });
        return;
      }

      const service = new ProjetoService();

      const projeto = await service.criarProjeto(
        { titulo, descricao, categoria, conteudo, thumbnail: thumbnailCompleto },
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

  public async buscarPorId(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

    const projeto = await prismaClient.projeto.findUnique({
      where: { id: Number(id) },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            username: true,
          },
        },
      },
    });

    if (!projeto) {
      res.status(404).json({ message: "Projeto não encontrado." });
      return;
    }

    res.status(200).json({
      sucesso: true,
      mensagem: "Projeto carregado com sucesso.",
      data: projeto,
    });
  } catch (error) {
    return onError(error, res);
  }
}


  public async buscarPorSlug(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;

    if (!slug || typeof slug !== "string") {
      throw new HTTPError(400, "Slug inválido.");
    }

    const projeto = await prismaClient.projeto.findUnique({
      where: { slug },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            username: true
          }
        }
      }
    });

    if (!projeto) {
      throw new HTTPError(404, "Projeto não encontrado.");
    }

    res.status(200).json({
      sucesso: true,
      mensagem: "Projeto carregado com sucesso.",
      data: projeto
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

