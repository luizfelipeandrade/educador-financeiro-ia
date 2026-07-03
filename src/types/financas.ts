export interface DadosFinanceiros {
    rendaMensal: number;
    gastosFixos: number;
    gastosVariaveis: number;
    dividas: number;
    reservaEmergencia: number;
    objetivoPrincipal: ObjetivoFinanceiro;
    prazoObjetivo: string;
}

export type ObjetivoFinanceiro =
| "quitar-dividas"
| "reserva-emergencia"
| "investir"
| "comprar-bem"
| "aposentadoria";

export interface DiagnosticoIA{
    diagnostico: string;
    pontosFortes: string[];
    pontosAtencao: string[];
    recomendacoes: string[];
    proximosPassos: string[];
}

export interface EstadoFormulario{
    etapaAtual: number;
    dados: Partial<DadosFinanceiros>;
    concluido: boolean;
}