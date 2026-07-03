# 💰 Educador Financeiro IA

Aplicação web que analisa uma simulação financeira e gera um diagnóstico personalizado usando Inteligência Artificial Generativa (Google Gemini).

Projeto desenvolvido como exercício da plataforma [DIO](https://www.dio.me/), unindo boas práticas de Front-End com integração de IA.

## ✨ Funcionalidades

- **Formulário em etapas**: coleta de renda, gastos, dívidas, reserva de emergência e objetivos financeiros
- **Validação por etapa**: impede avançar sem preencher os campos necessários
- **Tema claro/escuro**: alternância de tema com Context API
- **Persistência no navegador**: os dados não se perdem ao recarregar a página (localStorage)
- **Diagnóstico com IA**: integração com a API do Google Gemini, que analisa os dados e retorna:
  - Diagnóstico geral da situação financeira
  - Pontos fortes
  - Pontos de atenção
  - Recomendações práticas
  - Próximos passos

## 🛠️ Tecnologias utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Google Gemini API](https://ai.google.dev/)
- Context API (tema claro/escuro)
- localStorage (persistência)

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada)
- Uma chave de API do Google Gemini, obtida em [Google AI Studio](https://aistudio.google.com/)

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/luizfelipeandrade/educador-financeiro-ia
```

2. Entre na pasta do projeto:
```bash
cd educador-financeiro-ia
```

3. Instale as dependências:
```bash
npm install
```

4. Crie um arquivo `.env` na raiz do projeto com sua chave da API: VITE_GEMINI_API_KEY=sua_chave_aqui

5. Rode o projeto:
```bash
npm run dev
```

6. Acesse o endereço mostrado no terminal (geralmente `http://localhost:5173`)

## ⚠️ Aviso de segurança

Este projeto chama a API do Gemini diretamente do navegador, o que expõe a chave da API no código do cliente. Essa abordagem é adequada para fins de **aprendizado e portfólio**, mas não é recomendada para aplicações em produção — nesses casos, a chamada deveria passar por um backend/servidor que protege a chave.

## 📌 Status

Projeto funcional e completo, desenvolvido como exercício de estudo (DIO).

## 👤 Autor

Luiz Felipe