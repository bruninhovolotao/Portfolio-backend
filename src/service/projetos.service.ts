import { prismaClient } from "../database/prisma.client";
import { CriarProjetoDTO } from "../dto/projetos.dto";
import { Projeto } from "@prisma/client";
import { HTTPError } from "../utils/http.error";

export class ProjetoService {
    public async criarProjeto(dto: CriarProjetoDTO, usuarioId: number): Promise<Projeto>{
        const novoProjeto = await prismaClient.projeto.create({
            data:{
                titulo: dto.titulo,
                descricao: dto.descricao,
                categoria: dto.categoria,
                conteudo: dto.conteudo,
                thumbnail: dto.thumbnail,
                usuarioId,
            }
        })

        return novoProjeto
    }

    public async atualizarProjeto(projetoId: number, usuarioId: number, dados: Partial<CriarProjetoDTO>): Promise<Projeto>{
        const projeto = await prismaClient.projeto.findUnique({
            where: { id: projetoId },
        })

        if( !projeto || projeto.usuarioId !== usuarioId ){
            throw new HTTPError (403, "Projeto não encontrado ou acesso negado.")
        }

        const projetoAtualizado = await prismaClient.projeto.update({
            where: { id: projetoId },
            data: dados,
        })

        return projetoAtualizado
    }

    public async deletarProjeto(projetoId: number, usuarioId: number ): Promise<void>{
        const projeto = await prismaClient.projeto.findUnique({
            where: { id: projetoId }
        })

        if( !projeto || projeto.usuarioId !== usuarioId ){
            throw new HTTPError(403, "Projeto não encontrado ou acesso negado.")
        }

        await prismaClient.projeto.delete({
            where: { id: projetoId }
        })

    }
}