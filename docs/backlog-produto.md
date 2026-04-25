# Backlog do Produto - Projeto Descarte de Lixo Eletrônico

## 1. Introdução
Este documento apresenta o Product Backlog do projeto de desenvolvimento de uma aplicação web dedicada à gestão do descarte de resíduos eletrônicos. O objetivo é centralizar todos os requisitos e funcionalidades planejadas, garantindo a transparência e a evolução incremental conforme as diretrizes de Engenharia de Software.

## 2. Visão Geral do Projeto
* **Equipe**: Augusto Fernandes Carvalho, Diovani da Cruz Mangia Maciel Junior, Ezequiel Dominguez Santos, Leonardo Carvalho Silva e Rafael Silva Martins.
* **Product Owner**: Ezequiel Dominguez Santos.
* **Scrum Master**: Diovani da Cruz Mangia Maciel Junior.
* **Stack Tecnológico**: React, Spring Boot e PostgreSQL.

## 3. Lista de User Stories (Priorizada)

| ID | Requisito / Funcionalidade | Prioridade | Esforço (SP) | Status |
| :--- | :--- | :--- | :--- | :--- |
| US01 | Autenticação e Segurança do Administrador | Alta | 5 | Pendente |
| US02 | Gestão de Pontos de Coleta (CRUD) | Alta | 8 | Pendente |
| US03 | Visualização de Pontos (Mapa e Cards) | Alta | 8 | Pendente |
| US04 | Detalhamento e Geolocalização do Usuário | Média | 5 | Pendente |
| US05 | Gestão de Categorias e Feedbacks (Admin) | Média | 8 | Pendente |
| US06 | Registro de Feedback de Campo (Cidadão) | Baixa | 3 | Pendente |

---

## 4. Detalhe das Histórias de Usuário

### [US01] Autenticação e Segurança de Administrador
**Descrição:**
Como Administrador do sistema de descarte de lixo eletrônico, eu quero realizar login com e-mail e senha para que possa acessar as funcionalidades restritas de gestão de pontos com segurança e proteger a integridade dos dados.

**Critérios de Aceitação:**
* O sistema deve permitir o acesso às áreas administrativas apenas mediante login bem-sucedido.
* O sistema deve validar se o e-mail e a senha informados estão corretos.
* Usuários não autenticados devem ser redirecionados para a tela de login ao tentar acessar URLs protegidas.
* Deve existir uma função de "Sair" (Logout) que encerre a sessão do usuário com segurança.
* Senhas devem ser armazenadas de forma segura no banco de dados (utilizando hashing).
* Mensagens de erro devem ser exibidas em caso de credenciais inválidas.

**Tarefas Técnicas (Sub-tasks):**
* [TASK] Modelagem da entidade Usuário e persistência de credenciais no banco de dados. #7
* [TASK] Configuração da lógica de segurança e filtros de autenticação (Backend). #8
* [TASK] Desenvolvimento da interface web para o formulário de login e feedbacks de erro (Frontend). #9

---

### [US02] Gestão de Pontos de Coleta (CRUD)
**Descrição:**
Como Administrador do sistema, eu quero cadastrar, listar, editar e remover pontos de coleta de lixo eletrônico para que a base de dados do mapa esteja sempre atualizada e com informações precisas para a população.

**Critérios de Aceitação (Definition of Done):**
* O sistema deve permitir o cadastro de um novo ponto com: nome, endereço completo, descrição, tipos de resíduos aceitos e coordenadas (lat/long).
* O sistema deve validar campos obrigatórios (ex: nome e endereço não podem ser vazios).
* O administrador deve conseguir visualizar uma lista de todos os pontos cadastrados.
* O sistema deve permitir a edição de qualquer informação de um ponto já existente.
* O sistema deve permitir a exclusão de um ponto de coleta, solicitando confirmação antes da remoção definitiva.
* As coordenadas (latitude e longitude) devem ser validadas para garantir que o pin seja plotado corretamente no mapa futuramente.

**Tarefas Técnicas (Sub-tasks):**
* [TASK] Criação da estrutura da tabela de Pontos de Coleta no banco de dados. #10
* [TASK] Implementação dos endpoints da API REST (GET, POST, PUT, DELETE) para a entidade Ponto. #11
* [TASK] Desenvolvimento da interface administrativa (Dashboard) para listagem e formulários de cadastro/edição. #13

---

### [US03] Visualização de Pontos (Mapa e Cards)
**Descrição:**
Como Cidadão interessado em descartar lixo eletrônico, eu quero visualizar os pontos de coleta em um mapa interativo e em uma lista de cards para que eu possa identificar rapidamente as opções de descarte disponíveis na cidade.

**Critérios de Aceitação (Definition of Done):**
* O sistema deve carregar um mapa interativo exibindo "pins" em todos os pontos de coleta ativos.
* Ao clicar em um "pin", deve ser exibido um resumo do ponto (nome e endereço).
* O sistema deve oferecer uma visão alternativa em formato de lista (cards).
* Cada card deve exibir nome, endereço e principais tipos de resíduos aceitos.
* A interface deve permitir a alternância rápida entre a visualização de mapa e lista.

**Tarefas Técnicas (Sub-tasks):**
* [TASK] Configuração do mapa base e renderização de markers dinâmicos. #21
* [TASK] Criação da interface de listagem com cards responsivos. #22
* [TASK] Integração com o endpoint de listagem pública de pontos. #23

---

### [US04] Detalhamento e Geolocalização do Usuário
**Descrição:**
Como Cidadão em deslocamento, eu quero ver minha localização no mapa e a distância até os pontos de coleta para que eu possa escolher o local mais próximo e obter informações detalhadas de funcionamento.

**Critérios de Aceitação (Definition of Done):**
* O sistema deve solicitar permissão e capturar a geolocalização do navegador do usuário.
* A posição do usuário deve ser plotada no mapa com um ícone distinto dos pontos de coleta.
* O sistema deve exibir a distância aproximada (em metros ou km) em cada card de ponto.
* Ao selecionar um ponto, deve ser exibida uma tela/modal com detalhes completos (horários e restrições).
* Caso a geolocalização seja negada, o sistema deve funcionar normalmente, ocultando apenas as informações de distância.

**Tarefas Técnicas (Sub-tasks):**
* [TASK] Implementação de captura de coordenadas via Geolocation API. #24
* [TASK] Lógica para cálculo de distância (Haversine) e exibição nos componentes de UI. #25
* [TASK] Criação da tela/modal de detalhes do ponto de coleta. #26

---

### [US05] Gestão de Categorias e Feedbacks (Admin)
**Descrição:**
Como Administrador do sistema, eu quero gerenciar as categorias de materiais e moderar os feedbacks enviados pelos usuários para que o sistema se mantenha organizado e os problemas relatados sejam resolvidos.

**Critérios de Aceitação (Definition of Done):**
* O administrador deve poder criar, editar e excluir categorias de lixo (ex: Pilhas, Monitores).
* O sistema deve permitir listar todos os feedbacks enviados pelos cidadãos, ordenados por data.
* Cada feedback deve estar vinculado a um ponto de coleta específico.
* O administrador deve poder marcar um feedback como "Resolvido".
* As categorias cadastradas devem estar disponíveis para seleção no momento da criação de um ponto de coleta.

**Tarefas Técnicas (Sub-tasks):**
* [TASK] CRUD de Categorias (Entidade, Controller e Interface Admin). #27
* [TASK] Implementação da lógica de listagem e moderação de Feedbacks (Update status). #28
* [TASK] Ajuste no formulário de pontos para vincular as categorias existentes (Relacionamento N:N). #29

---

### [US06] Registro de Feedback de Campo (Cidadão)
**Descrição:**
Como Cidadão utilizando um ponto de coleta, eu quero relatar um problema (ex: lixeira cheia) sobre um ponto específico para que a administração seja notificada e realize a manutenção necessária.

**Critérios de Aceitação (Definition of Done):**
* O sistema deve disponibilizar um formulário de feedback acessível na tela de detalhes do ponto.
* O usuário deve selecionar o tipo de problema via lista pré-definida (ENUM).
* O sistema deve permitir o envio de um comentário opcional.
* Deve haver uma mensagem de confirmação após o envio bem-sucedido.
* Não deve ser necessário login para realizar o envio de feedback.

**Tarefas Técnicas (Sub-tasks):**
* [TASK] Criação do formulário de feedback (Frontend). #30
* [TASK] Criação do endpoint público de POST para recebimento de feedbacks. #31
* [TASK] Implementação de validações básicas (anti-spam simples ou campos obrigatórios). #32
