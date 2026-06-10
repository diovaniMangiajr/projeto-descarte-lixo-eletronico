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
| US01 | Autenticação e Segurança do Administrador | Alta | 5 | **Concluído** |
| US02 | Gestão de Pontos de Coleta (CRUD) | Alta | 8 | **Concluído** |
| US03 | Visualização de Pontos (Mapa e Cards) | Alta | 8 | **Concluído** |
| US04 | Detalhamento e Geolocalização do Usuário | Média | 5 | **Concluído** |
| US05 | Gestão de Tipos de Produtos e Relatos de Problemas (Admin) | Média | 8 | **Parcialmente Concluído** |
| US06 | Registro de Relato de Problema de Campo (Cidadão) | Média | 3 | **Concluído** |

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
* [TASK] Desenvolvimento da interface web para o formulário de login e alertas de erro (Frontend). #9

---

### [US02] Gestão de Pontos de Coleta (CRUD)
**Descrição:**
Como Administrador do sistema, eu quero cadastrar, listar, editar e remover pontos de coleta de lixo eletrônico para que a base de dados do mapa esteja sempre atualizada e com informações precisas para a população.

**Critérios de Aceitação (Definition of Done):**
* O sistema deve permitir o cadastro de um novo ponto com: nome, endereço completo, descrição, tipos de resíduos aceitos, horário de abertura e horário de fechamento.
* O sistema deve validar campos obrigatórios (ex: nome e endereço não podem ser vazios).
* O administrador deve conseguir visualizar uma lista de todos os pontos cadastrados.
* O sistema deve permitir a edição de qualquer informação de um ponto já existente.
* O sistema deve permitir a exclusão de um ponto de coleta, solicitando confirmação antes da remoção definitiva.
* O sistema deve capturar automaticamente as coordenadas (latitude e longitude) a partir do endereço fornecido via integração com uma API externa de Geocodificação, garantindo que o pin seja plotado corretamente no mapa.

**Tarefas Técnicas (Sub-tasks):**
* [TASK] Criação da estrutura da tabela de Pontos de Coleta no banco de dados. #10
* [TASK] Implementação dos endpoints da API REST (GET, POST, PUT, DELETE) para a entidade Ponto. #11
* [TASK] Desenvolvimento das lógicas de controle e validação de persistência do painel administrativo (Backend). #12
* [TASK] Desenvolvimento da interface administrativa (Dashboard) para listagem e formulários de cadastro/edição (Frontend). #13

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

### [US05] Gestão de Tipos de Produtos e Relatos de Problemas (Admin)
**Descrição:**
Como Administrador do sistema, eu quero gerenciar os tipos de produtos de lixo eletrônico e moderar os relatos de problemas enviados pelos usuários para que o sistema se mantenha organizado e os problemas relatados sejam resolvidos.

**Critérios de Aceitação (Definition of Done):**
* O administrador deve poder criar, editar e excluir os tipos de produto de lixo eletrônico (ex: Pilhas, Monitores).
* O sistema deve permitir listar todos os relatos de problemas enviados pelos cidadãos, ordenados por data.
* Cada relato de problema deve estar vinculado a um ponto de coleta específico.
* ~~O administrador deve poder marcar um relato de problema como "Resolvido".~~ *(Nota: Funcionalidade inteiramente cortada do escopo do MVP atual, tanto na interface quanto no banco de dados, sendo mapeada como débito técnico pós-projeto).*
* Os tipos de produtos de lixo eletrônico cadastrados devem estar disponíveis para seleção no momento da criação de um ponto de coleta.

**Tarefas Técnicas (Sub-tasks):**
* [TASK] CRUD de tipos de produtos de lixo eletrônico (Entidade, Controller e Interface Admin). #27
* [TASK] Implementação da lógica de listagem e moderação de relatos de problemas (Update status). #28
* [TASK] Ajuste no formulário de pontos para vincular os tipos de produtos existentes (Relacionamento N:N). #29
* [TASK] Implementação de trigger/serviço para geração automática de Notificação ao salvar um Relato de Problema. #68

---

### [US06] Registro de Relato de Problema de Campo (Cidadão)
**Descrição:**
Como Cidadão utilizando um ponto de coleta, eu quero enviar um relato de problema (ex: lixeira cheia) sobre um ponto específico para que a administração seja notificada e realize a manutenção necessária.

**Critérios de Aceitação (Definition of Done):**
* O sistema deve disponibilizar um formulário de relato de problema acessível na tela de detalhes do ponto.
* O usuário deve selecionar o tipo de problema via lista pré-definida (ENUM).
* O sistema deve permitir o envio de um comentário opcional.
* Deve haver uma mensagem de confirmação após o envio bem-sucedido.
* O sistema deve validar se os campos de nome e e-mail foram preenchidos antes de permitir o envio do relato.

**Tarefas Técnicas (Sub-tasks):**
* [TASK] Criação do formulário de relato de problema (Frontend). #30
* [TASK] Criação do endpoint público de POST para recebimento de relato de problemas. #31
* [TASK] Implementação de validações básicas (anti-spam simples ou campos obrigatórios). #32
