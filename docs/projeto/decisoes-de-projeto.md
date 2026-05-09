# Documento de Decisões de Projeto

## 1. Decomposição da Solução em Partes/Módulos

A arquitetura do sistema foi organizada segundo o princípio de Separação de Preocupações (Separation of Concerns). A aplicação foi estruturada em dois módulos independentes, mantidos em repositórios distintos:

* **Módulo de Apresentação (Frontend):** Implementado como uma Single Page Application (SPA) utilizando React e Vite. É o componente encarregado da renderização da interface, gerenciamento do estado local e consumo da API.
* **Módulo de Negócio e API (Backend):** Implementado em Java com o framework Spring Boot. Responsável por expor a API RESTful, processar as regras de negócio e realizar a persistência de dados.

**Justificativa da Stack:** A escolha do ecossistema Spring Boot baseou-se na experiência prévia da equipe com a tecnologia e na organização estrutural que a Orientação a Objetos oferece para a modelagem do domínio. O uso do React justificou-se pela viabilidade de integração com bibliotecas de mapas e adequação à curva de aprendizado do grupo.

---

## 2. Justificativas com Base em Princípios de Projeto (SOLID)

A estruturação do backend orienta-se pelos princípios SOLID, com foco na distribuição de responsabilidades e na redução de dependências diretas:

### 2.1. Princípio da Responsabilidade Única (SRP) e Coesão
A aplicação utiliza a separação em camadas para garantir que cada classe possua uma única responsabilidade central:
* Os **Controllers** manipulam exclusivamente a entrada e saída de dados via HTTP.
* Os **Services** concentram estritamente as lógicas de negócio e regras de validação.
Essa divisão garante alta coesão, isolando as alterações de regra de negócio das alterações de protocolo de comunicação.

### 2.2. Princípio da Inversão de Dependência (DIP) e Acoplamento
Aplicamos a Inversão de Dependência através do mecanismo de Injeção de Dependência nativo do framework Spring. As classes de serviço interagem com a camada de persistência por meio de abstrações (interfaces `JpaRepository`), e não instanciando classes concretas. Essa decisão promove o baixo acoplamento entre a regra de negócio e a infraestrutura de dados.

---

## 3. Análise de Alternativas de Implementação

Durante o planejamento técnico, as seguintes alternativas arquiteturais foram avaliadas:

### Alternativa 1: Aplicação Monolítica (Server-Side Rendering) vs. SPA + API REST
* **Análise:** Avaliou-se a possibilidade de utilizar renderização no lado do servidor para construir o frontend acoplado ao backend no mesmo projeto.
* **Decisão:** Optou-se pela separação entre SPA (React) e API RESTful.
* **Justificativa:** O uso de uma SPA previne o recarregamento completo das páginas durante a navegação, requisito técnico necessário para manter a estabilidade da biblioteca de mapas (Leaflet). Além disso, a padronização REST permite o reaproveitamento da API para eventuais clientes mobile no futuro.

### Alternativa 2: Gerenciamento do Esquema de Banco de Dados (Hibernate DDL-Auto vs. Flyway)
* **Análise:** Avaliou-se a utilização do recurso de geração automática de tabelas do Hibernate (JPA) a partir das entidades de domínio.
* **Decisão:** Optou-se pela utilização da ferramenta de migração Flyway.
* **Justificativa:** O Flyway possibilita o versionamento formal do banco de dados através de scripts SQL explícitos. Isso garante maior previsibilidade nas alterações estruturais e evita inconsistências de esquema entre os ambientes de desenvolvimento da equipe.

---

## 4. Alinhamento entre Requisitos e Estrutura Proposta

As escolhas técnicas implementadas suportam o atendimento dos requisitos definidos na Sprint 2:
* **RF02 (Visualização Geográfica):** O isolamento do frontend permite que a interface processe os dados de coordenadas dinamicamente no navegador, atendendo à necessidade de um mapa interativo sem sobrecarregar o servidor.
* **RF08 (Autenticação) e RNF01:** A adoção da API RESTful viabiliza a implementação de autenticação *stateless* baseada em tokens (JWT), adequando-se à comunicação isolada entre cliente e servidor.
