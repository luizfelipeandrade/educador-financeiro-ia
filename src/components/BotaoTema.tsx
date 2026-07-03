import { useTema } from "../context/TemaContext";

export function BotaoTema(){
    const { tema, alternarTema} = useTema();

    return(
        <button type="button" className="botao-tema" onClick={alternarTema}>
            {tema == "claro" ? "🌙 Modo escuro" : "☀️ Modo claro"}
        </button>
    );
}