# MyContacts - Gerenciador de Contatos

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Projeto de uma aplicação completa para gerenciamento de contatos, construída com as tecnologias mais modernas do ecossistema React. O objetivo é criar uma base de código limpa, escalável e de fácil manutenção, aplicando bons conceitos de arquitetura de software.

## Features

- **CRUD completo de Contatos:** Crie, liste, edite e remova contatos.
- **Filtragem e Ordenação:** Busque contatos por nome e ordene a lista.
- **Sistema de Notificações (Toasts):** Feedbacks visuais para as ações do usuário.
- **Design Responsivo:** Interface adaptável para diferentes tamanhos de tela.
- **Tratamento de Erros:** Mensagens claras para falhas de comunicação com a API ou erros de validação.

## Destaques Técnicos e Arquitetura

Este projeto não é apenas um CRUD, mas um campo de provas para boas práticas de engenharia de software no front-end.

### 1. **Sistema de Eventos Desacoplado (`EventManager`)**
Para a comunicação entre componentes distantes na árvore, como disparar uma notificação de `Toast` a partir de uma ação em uma página, foi implementado um **`EventManager`** customizado.
- **Padrão:** Observer (Publish/Subscribe).
- **Funcionamento:** Componentes podem emitir eventos globais (ex: `addtoast`) sem conhecer quem os consome. O `ToastContainer` "escuta" esses eventos e exibe as notificações.
- **Vantagem:** Evita o *prop drilling* e mantém os componentes independentes e reutilizáveis.

### 2. **Hooks Customizados para Lógica Reutilizável**
- **`useSafeAsyncState`**: Um hook que encapsula o `useState` para previnir o erro "Can't perform a React state update on an unmounted component". Ele verifica se o componente ainda está montado antes de atualizar o estado, garantindo a segurança em operações assíncronas.
- **`useErrors`**: Um hook para gerenciar o estado de erros em formulários, abstraindo a lógica de adicionar, remover e obter mensagens de erro por campo.

### 3. **Serviço de API Centralizado (`HttpClient`)**
Toda a comunicação com a API é gerenciada por uma classe `HttpClient`.
- **Abstração:** Centraliza a lógica de requisições (`fetch`), headers, e o tratamento de respostas.
- **Error Handling:** Padroniza a captura de erros da API, lançando uma classe `APIError` customizada, o que facilita o tratamento nos `services`.
- **Flexibilidade:** Facilita a troca da biblioteca de requisições (ex: para `axios`) ou a adição de interceptors (ex: para refresh tokens) no futuro, sem impactar o resto da aplicação.

### 4. **Renderização Fora do DOM Principal (`ReactPortal`)**
Os componentes `Modal` e `ToastContainer` utilizam um `ReactPortal` para serem renderizados diretamente no `<body>` da aplicação.
- **Vantagem:** Evita problemas de `z-index` e `overflow` que poderiam ocorrer se os elementos estivessem aninhados dentro de outros componentes com estilos restritivos.

## 🛠️ Tecnologias Utilizadas

- **React 18** (com a nova Root API)
- **Vite** como build tool
- **React Router DOM v6** para gerenciamento de rotas
- **CSS Modules** para estilização escopada por componente
- **ESLint** para garantir a qualidade e padronização do código

## ⚙️ Como Rodar o Projeto

**Pré-requisitos:**
- **Node.js** (v16 ou superior)
- **npm** ou **yarn**
- **API Backend:** Este projeto consome uma API para persistir os dados. Certifique-se de que a API esteja rodando localmente.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/mycontacts-frontend.git
   cd mycontacts-frontend
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   ```

3. **Configure a URL da API:**
   O `HttpClient` busca a URL base da API em `http://localhost:3001`. Se sua API estiver rodando em uma porta diferente, altere o `baseURL` no arquivo `src/services/utils/HttpClient.js`.

   Link para a API BackEnd: 

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   node src/index.js
   ```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).
