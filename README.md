# Motus.IA - Plataforma de Aprendizagem Adaptativa

O Motus.IA é uma solução educacional inovadora que utiliza inteligência artificial para:
*   Diagnóstico Preditivo de gaps de aprendizado
*   Nivelamento Adaptativo baseado em neurociência
*   Gamificação do processo educacional
*   Métricas ESG para investidores sociais
*   Dashboard Executivo para acompanhamento de impacto

---

## 📋 Sumário

1.  [Sobre o Projeto](#-sobre-o-projeto)
2.  [Tecnologias Utilizadas](#-tecnologias-utilizadas)
3.  [Instalação](#-instalação)
4.  [Como Usar](#-como-usar)
5.  [Estrutura de Pastas](#-estrutura-de-pastas)
6.  [Rotas Principais](#-rotas-principais)
7.  [Demonstração](#-demonstração)
8.  [Autores e Créditos](#-autores-e-créditos)
9.  [Contato](#-contato)

---

## 💻 Sobre o Projeto

Este repositório contém o código-fonte do **frontend** da plataforma Motus.IA. A aplicação é desenvolvida para oferecer uma experiência de usuário rica e interativa para três perfis principais:

*   **Alunos:** Acessam uma jornada de aprendizado gamificada, com missões, desafios e ranking para estimular o engajamento e o desenvolvimento de competências.
*   **Mentores/Educadores:** Utilizam dashboards para acompanhar o progresso dos alunos, identificar dificuldades e gerar conteúdo adaptativo de forma automatizada.
*   **Gestores ESG/Investidores Sociais:** Têm acesso a um painel executivo com métricas de impacto social, como ROI Social, desenvolvimento de ODS e análise de skills gap.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

*   **[React](https://react.dev/)**: Biblioteca para construção de interfaces de usuário.
*   **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
*   **[Vite](https://vitejs.dev/)**: Ferramenta de build para desenvolvimento frontend moderno.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first para estilização rápida.
*   **[React Router](https://reactrouter.com/)**: Para gerenciamento de rotas na aplicação.
*   **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones SVG.

---

## ⚙️ Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento localmente.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/motus-front.git
    cd motus-front
    ```

2.  **Instale as dependências:**
    Utilize o gerenciador de pacotes de sua preferência.
    ```bash
    # Com npm
    npm install

    # Com yarn
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto, seguindo o exemplo do `.env.example` (se houver), e adicione as variáveis necessárias.

---

## ▶️ Como Usar

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    # Com npm
    npm run dev

    # Com yarn
    yarn dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou na porta indicada no terminal).

2.  **Para gerar a build de produção:**
    ```bash
    # Com npm
    npm run build
    ```
    Os arquivos otimizados serão gerados na pasta `dist/`.

---

## 📁 Estrutura de Pastas

A estrutura de pastas do projeto segue um padrão modular para facilitar a manutenção e escalabilidade.

```
motus-front/
├── public/           # Arquivos estáticos públicos
└── src/
    ├── assets/       # Imagens, fontes e outros assets
    ├── components/   # Componentes React reutilizáveis
    │   ├── ui/       # Componentes de UI genéricos (shadcn/ui)
    │   └── ...
    ├── lib/          # Funções utilitárias
    ├── page/         # Componentes que representam as páginas da aplicação
    ├── App.tsx       # Componente raiz da aplicação
    └── main.tsx      # Ponto de entrada da aplicação
```

---

## 🗺️ Rotas Principais

A aplicação possui diversas rotas para atender aos diferentes perfis de usuário. As principais são:

*   `/`: Página inicial de apresentação.
*   `/login`: Página de autenticação.
*   `/ranking`: Exibe o ranking de pontuação dos alunos.
*   `/aulas`: Listagem de missões e desafios disponíveis para os alunos.
*   `/desafio/:id`: Página de resolução de um desafio específico.
*   `/dashboard-mentor`: Painel de acompanhamento para mentores.
*   `/dashboard-esg`: Painel com métricas de impacto para gestores ESG.
*   `/conteudo/gerar`: Ferramenta para geração de conteúdo adaptativo (mentores).

---

## 👨‍💻 Autores e Créditos

*   **[Gustavo Pinheiro de Oliveira]**

---

## 📞 Contato

Para mais informações sobre o projeto, entre em contato:

*   **Email:** `contato@motus.ia`
*   **Website:** `https://motus.ia`

