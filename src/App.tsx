import { FormularioFinanceiro } from "./components/FormularioFinanceiro";
import { TemaProvider } from "./context/TemaContext";
import { BotaoTema } from "./components/BotaoTema";
import "./App.css";

function App(){
  return(
    <TemaProvider>
      <div className="app">
        <BotaoTema/>
        <h1>Educador Financeiro IA</h1>
        <FormularioFinanceiro/>
      </div>
    </TemaProvider>
  );
}

export default App;