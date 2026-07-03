// src/context/TemaContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Tema = "claro" | "escuro";

interface TemaContextType {
  tema: Tema;
  alternarTema: () => void;
}

const TemaContext = createContext<TemaContextType | undefined>(undefined);

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>("claro");

  function alternarTema() {
    setTema((prev) => (prev === "claro" ? "escuro" : "claro"));
  }

  // Aplica a classe no <body> sempre que o tema mudar
  useEffect(() => {
    document.body.className = tema === "escuro" ? "tema-escuro" : "tema-claro";
  }, [tema]);

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}

// Hook customizado para consumir o contexto com segurança
export function useTema() {
  const contexto = useContext(TemaContext);
  if (!contexto) {
    throw new Error("useTema precisa ser usado dentro de um TemaProvider");
  }
  return contexto;
}