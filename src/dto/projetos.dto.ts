export interface CriarProjetoDTO {
  titulo: string;
  descricao?: string;
  conteudo?: string;
  categoria: string;
  thumbnail?: string;
}

export interface ProjetoDTO {
  id: number;
  titulo: string;
  descricao: string | null;
  conteudo: string | null;
  categoria: string;
  thumbnail: string | null;
  usuario: {
    id: number;
    nome: string;
  };
}

