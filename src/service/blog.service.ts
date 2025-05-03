import { prismaClient } from "../database/prisma.client";
import { CriarArtigoDTO } from "../dto/blog.dto";
import { Blog } from "@prisma/client";
import { HTTPError } from "../utils/http.error";

export class BlogService {
    public async criarArtigo(dto: CriarArtigoDTO, usuarioId: number): Promise<Blog>{
        const novoArtigo = await prismaClient.blog.create({
            data:{
                titulo: dto.titulo,
                descricao: dto.descricao,
                categoria: dto.categoria,
                conteudo: dto.conteudo,
                thumbnail: dto.thumbnail,
                usuarioId,
            }
        })

        return novoArtigo
    }

    public async atualizarArtigo(artigoID: number, usuarioId: number, dados: Partial<CriarArtigoDTO>): Promise<Blog>{
        const artigo = await prismaClient.blog.findUnique({
            where: { id: artigoID },
        })

        if( !artigo || artigo.usuarioId !== usuarioId ){
            throw new HTTPError (403, "Artigo não encontrado ou acesso negado.")
        }

        const artigoAtualizado = await prismaClient.blog.update({
            where: { id: artigoID },
            data: dados,
        })

        return artigoAtualizado
    }

    public async deletarArtigo(artigoID: number, usuarioId: number ): Promise<void>{
        const artigo = await prismaClient.blog.findUnique({
            where: { id: artigoID }
        })

        if( !artigo || artigo.usuarioId !== usuarioId ){
            throw new HTTPError(403, "Artigo não encontrado ou acesso negado.")
        }

        await prismaClient.blog.delete({
            where: { id: artigoID }
        })

    }
}