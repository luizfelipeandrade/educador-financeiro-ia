// src/components/FormularioFinanceiro.tsx
import { useState } from "react";
import { useFormularioFinanceiro } from "../hooks/useFormularioFinanceiro";
import { gerarDiagnostico } from "../services/geminiService";
import type { DadosFinanceiros, DiagnosticoIA } from "../types/financas";
import { EtapaRendaGastos } from "./EtapaRendaGastos";
import { EtapaDividasReserva } from "./EtapaDividasReserva";
import { EtapaObjetivo } from "./EtapaObjetivo";
import { EtapaRevisao } from "./EtapaRevisao";
import { TelaResultado } from "./TelaResultado";

export function FormularioFinanceiro() {
  const { estado, totalEtapas, atualizarDados, proximaEtapa, etapaAnterior, reiniciar } =
    useFormularioFinanceiro();

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [diagnostico, setDiagnostico] = useState<DiagnosticoIA | null>(null);

  const ehUltimaEtapa = estado.etapaAtual === totalEtapas;

  function dadosEstaoCompletos(
    dados: Partial<DadosFinanceiros>
  ): dados is DadosFinanceiros {
    return (
      dados.rendaMensal !== undefined &&
      dados.gastosFixos !== undefined &&
      dados.gastosVariaveis !== undefined &&
      dados.dividas !== undefined &&
      dados.reservaEmergencia !== undefined &&
      dados.objetivoPrincipal !== undefined &&
      dados.prazoObjetivo !== undefined
    );
  }

  function etapaAtualEstaValida(): boolean {
  const { dados } = estado;
  switch (estado.etapaAtual) {
    case 1:
      return (
        dados.rendaMensal !== undefined &&
        dados.gastosFixos !== undefined &&
        dados.gastosVariaveis !== undefined
      );
    case 2:
      return (
        dados.dividas !== undefined && dados.reservaEmergencia !== undefined
      );
    case 3:
      return (
        dados.objetivoPrincipal !== undefined &&
        dados.prazoObjetivo !== undefined
      );
    case 4:
      return dadosEstaoCompletos(dados);
    default:
      return true;
  }
}

  async function lidarComProximo() {
  if (!etapaAtualEstaValida()) {
    setErro("Preencha todos os campos desta etapa antes de continuar.");
    return;
  }

  setErro(null);

  if (!ehUltimaEtapa) {
    proximaEtapa();
    return;
  }

  if (!dadosEstaoCompletos(estado.dados)) {
    setErro("Preencha todos os campos antes de gerar o diagnóstico.");
    return;
  }

  setCarregando(true);
  try {
    const resultado = await gerarDiagnostico(estado.dados);
    setDiagnostico(resultado);
  } catch (e) {
    setErro(
      e instanceof Error ? e.message : "Erro inesperado ao gerar diagnóstico."
    );
  } finally {
    setCarregando(false);
  }
}

  function lidarComReiniciar() {
    setDiagnostico(null);
    setErro(null);
    reiniciar();
  }

  if (diagnostico) {
    return <TelaResultado diagnostico={diagnostico} aoReiniciar={lidarComReiniciar} />;
  }

  return (
    <div className="formulario-container">
      <p className="progresso">
        Etapa {estado.etapaAtual} de {totalEtapas}
      </p>

      {estado.etapaAtual === 1 && (
        <EtapaRendaGastos dados={estado.dados} aoAtualizar={atualizarDados} />
      )}
      {estado.etapaAtual === 2 && (
        <EtapaDividasReserva dados={estado.dados} aoAtualizar={atualizarDados} />
      )}
      {estado.etapaAtual === 3 && (
        <EtapaObjetivo dados={estado.dados} aoAtualizar={atualizarDados} />
      )}
      {estado.etapaAtual === 4 && <EtapaRevisao dados={estado.dados} />}

      {erro && <p className="mensagem-erro">{erro}</p>}

      <div className="botoes-navegacao">
        {estado.etapaAtual > 1 && (
          <button type="button" onClick={etapaAnterior} disabled={carregando}>
            Voltar
          </button>
        )}
       <button type="button" onClick={lidarComProximo} disabled={carregando}>
  {carregando ? (
    <span className="conteudo-carregando">
      <span className="spinner" />
      Gerando diagnóstico...
    </span>
  ) : ehUltimaEtapa ? (
    "Gerar diagnóstico"
  ) : (
    "Próximo"
  )}
</button>
      </div>
    </div>
  );
}