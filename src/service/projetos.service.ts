import { prismaClient } from "../database/prisma.client";
import { CriarProjetoDTO, ProjetoDTO } from "../dto/projetos.dto";
import { Projeto } from "@prisma/client";
import { HTTPError } from "../utils/http.error";
import slugify from "slugify";

export class ProjetoService {
    public async criarProjeto(dto: CriarProjetoDTO, usuarioId: number): Promise<Projeto>{

        const slug = slugify(dto.titulo, {lower: true, strict: true});

        const slugExiste = await prismaClient.projeto.findUnique({
            where: { slug }
        });

        if (slugExiste) {
        throw new HTTPError(400, "Já existe um projeto com esse título.");
        }

        const novoProjeto = await prismaClient.projeto.create({
            data:{
                titulo: dto.titulo,
                slug,
                descricao: dto.descricao,
                categoria: dto.categoria,
                conteudo: dto.conteudo,
                thumbnail: dto.thumbnail,
                usuarioId,
            }
        })

        return novoProjeto
    }

    public async listarProjeto(): Promise<ProjetoDTO[]> {
        const listarProjetos = await prismaClient.projeto.findMany({
            select: {
            id: true,
            titulo: true,
            slug: true,
            descricao: true,
            conteudo: true,
            categoria: true,
            thumbnail: true,
            usuario: {
                select: {
                id: true,
                nome: true,
                },
            },
            }
        }); 
        return listarProjetos;
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