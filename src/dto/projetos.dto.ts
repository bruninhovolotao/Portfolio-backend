export interface CriarProjetoDTO {
  titulo: string;
  descricao?: string;
  conteudo?: string;
  categoria: string;
  thumbnail?: string | null
}

export interface ProjetoDTO {
  id: number;
  titulo: string;
  slug: string;
  descricao: string | null;
  conteudo: any;
  categoria: string;
  thumbnail: string | null;
  usuario: {
    id: number;
    nome: string;
  };
}

