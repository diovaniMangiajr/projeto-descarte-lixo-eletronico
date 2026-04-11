# Backlog do Produto - Projeto Descarte de Lixo Eletrônico

## 1. Introdução
Este documento apresenta o Product Backlog do projeto de desenvolvimento de uma aplicação web dedicada à gestão do descarte de resíduos eletrónicos. O objetivo é centralizar todos os requisitos e funcionalidades planeadas, garantindo a transparência e a evolução incremental conforme as diretrizes de Engenharia de Software.

## 2. Visão Geral do Projeto
* **Equipa**: Augusto Fernandes Carvalho, Diovani da Cruz Mangia Maciel Junior, Ezequiel Dominguez Santos, Leonardo Carvalho Silva e Rafael Silva Martins.
* **Product Owner**: Ezequiel Dominguez Santos.
* **Scrum Master**: Diovani da Cruz Mangia Maciel Junior.
* **Stack Tecnológico**: React, Spring Boot e PostgreSQL.

## 3. Lista de User Stories (Priorizada)

| ID | Requisito / Funcionalidade | Prioridade | Esforço (SP) | Status |
| :--- | :--- | :--- | :--- | :--- |
| US01 | Autenticação e Segurança do Administrador | Alta | 5 | Pendente |
| US02 | Gestão de Pontos de Recolha (CRUD) | Alta | 8 | Pendente |

---

## 4. Detalhe das Histórias de Utilizador

### [US01] Autenticação e Segurança do Administrador
**Descrição:**
Como Administrador do sistema de descarte de lixo eletrónico, eu pretendo realizar o login com e-mail e palavra-passe para que possa aceder às funcionalidades restritas de gestão de pontos com segurança e proteger a integridade dos dados.

**Critérios de Aceitação:**
* O sistema deve permitir o acesso às áreas administrativas apenas mediante login bem-sucedido.
* O sistema deve validar se o e-mail e a palavra-passe introduzidos estão corretos.
* Utilizadores não autenticados devem ser redirecionados para o ecrã de login ao tentar aceder a URLs protegidos.
* Deve existir uma função de "Sair" (Logout) que encerre a sessão do utilizador com segurança.
* As palavras-passe devem ser armazenadas de forma segura na base de dados.
* Mensagens de erro devem ser exibidas em caso de credenciais inválidas.

**Tarefas Técnicas:**
* [TASK] Modelação da entidade Utilizador e persistência de credenciais na base de dados. (#7)
* [TASK] Configuração da lógica de segurança e filtros de autenticação (Backend). (#8)
* [TASK] Desenvolvimento da interface web para o formulário de login e feedbacks de erro (Frontend). (#9)

---

### [US02] Gestão de Pontos de Recolha (CRUD)
**Descrição:**
Como Administrador do sistema, eu pretendo registar, listar, editar e remover pontos de recolha de lixo eletrónico para que a base de dados do mapa esteja sempre atualizada e com informações precisas para a população.

**Critérios de Aceitação:**
* O sistema deve permitir o registo de um novo ponto com: nome, endereço completo, descrição, tipos de resíduos aceites e coordenadas (lat/long).
* O sistema deve validar campos obrigatórios (ex: nome e endereço não podem estar vazios).
* O administrador deve conseguir visualizar uma lista de todos os pontos registados.
* O sistema deve permitir a edição de qualquer informação de um ponto já existente.
* O sistema deve permitir a exclusão de um ponto de recolha, solicitando confirmação antes da remoção definitiva.
* As coordenadas (latitude e longitude) devem ser validadas para garantir que o pin seja colocado corretamente no mapa futuramente.

**Tarefas Técnicas:**
* [TASK] Criação da estrutura da tabela de Pontos de Recolha na base de dados. (#10)
* [TASK] Implementação dos endpoints da API REST (GET, POST, PUT, DELETE) para a entidade Ponto. (#11)
* [TASK] Desenvolvimento da interface administrativa (Dashboard) para listagem e formulários de registo/edição. (#12)
