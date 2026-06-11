# ♻️ Projeto Descarte Eletrônico Lavras

Plataforma web para localizar e cadastrar pontos de coleta de lixo eletrônico em Lavras-MG. Desenvolvido para a disciplina **GCC188 - Engenharia de Software (2026/1)**, com foco em organização de informações, evolução incremental e sustentabilidade.

✅ **Status:** MVP (Produto Mínimo Viável) Concluído.

**Integrantes do Grupo:**
- Augusto Fernandes Carvalho
- Diovani da Cruz Mangia Maciel Júnior
- Ezequiel Dominguez Santos
- Rafael Silva Martins

## 🎯 Visão Geral e Escopo

O objetivo da plataforma é centralizar informações sobre ecopontos, permitindo que o cidadão encontre locais confiáveis de descarte (via mapa interativo e geolocalização) e que administradores façam a gestão desses dados (CRUD).

👉 *Para um aprofundamento sobre a contextualização do problema e o roadmap, consulte nossa [Visão Geral do Projeto](./docs/visao-geral.md).*

## 💻 Stack Tecnológica

* **Frontend:** React + TypeScript + Vite
* **Backend:** Java 21 + Spring Boot 3 + Spring Security
* **Banco de Dados:** PostgreSQL 16 + Flyway (Migrações)
* **Infraestrutura:** Docker e Nginx

👉 *Consulte nosso [Documento de Decisões de Projeto](./docs/projeto/decisoes-de-projeto.md) para ler a análise completa de alternativas e as justificativas baseadas nos princípios SOLID e padrões GoF adotados.*

## 🏗️ Estrutura do Repositório

A arquitetura adota o padrão **Cliente-Servidor (Client-Server)** via comunicação **RESTful**, utilizando um repositório orquestrador com submódulos.

```text
/
├── docs/       # Documentação técnica profunda (Arquitetura, Sprints, Testes, etc.)
├── frontend/   # Código fonte da SPA (React/Vite)
├── backend/    # Submódulo Git apontando para a API (Spring Boot)
└── docker-compose.yml # Orquestrador unificado dos serviços
```
👉 *Veja o [Documento de Arquitetura de Software](./docs/arquitetura/arquitetura.md) para visualizar os diagramas de componentes e o detalhamento das camadas.*

---

## 🚀 Como Executar o Projeto Completo (Ambiente Docker)

A orquestração da infraestrutura foi automatizada. Não é necessário instalar Java, Node.js ou PostgreSQL na máquina hospedeira.

### Pré-requisitos
* Sistema Operacional Linux (Recomendado).
* **Docker** instalado e operacional.

### Passo a Passo

**1. Clone o repositório principal e o submódulo**
Para baixar o código do frontend e do backend simultaneamente, é **obrigatório** utilizar a flag `--recursive`:

```bash
git clone --recursive https://github.com/diovaniMangiajr/projeto-descarte-lixo-eletronico.git
```

**2. Acesse a raiz do projeto**

```bash
cd projeto-descarte-lixo-eletronico
```

**3. Suba a orquestração mestre**
O comando abaixo fará o build do Java e do React, subirá o banco e executará as migrações (Flyway) em segundo plano:

```bash
docker compose up --build -d
```

**4. Acesse a aplicação**
Aguarde alguns segundos para a inicialização completa. Em seguida, abra no navegador:

👉 **http://localhost:5173**

---

## 🔐 Acesso ao Painel Administrativo

O banco de dados de testes já é inicializado automaticamente com 5 ecopontos em Lavras e uma conta de moderação ativa. Para testar o CRUD e as rotas protegidas, acesse `/login` utilizando:

* **E-mail:** `admin@descarte.local`
* **Senha:** `Admin@123`

---

## 📚 Hub de Documentação

Toda a documentação técnica e de engenharia do projeto está dividida e organizada em diretórios específicos dentro da pasta `docs/`. Acesse os links diretos abaixo:

* [Visão Geral do Projeto](./docs/visao-geral.md)
* [Arquitetura de Software](./docs/arquitetura/arquitetura.md)
* [Modelagem do Sistema (UML e DER)](./docs/modelagem/modelagem.md)
* [Padrões de Projeto (Design Patterns)](./docs/padroes/padroes-de-projeto.md)
* [Decisões de Projeto](./docs/projeto/decisoes-de-projeto.md)
* [Revisões Incrementais (Sprints)](./docs/sprints/)
* [Plano e Evidências de Testes](./docs/testes/)

---

## 🛠️ Desenvolvimento Isolado (Opcional)

Caso deseje trabalhar no desenvolvimento de apenas uma das partes do sistema, você pode executá-las de forma independente:

### Apenas o Backend (API e Banco de Dados)
Útil para testar chamadas e endpoints via Postman/Insomnia. O comando utilizará o Compose isolado do submódulo:
```bash
cd backend
docker compose up --build -d
```
A API ficará disponível em `http://localhost:8080`.

### Apenas o Frontend (Sem Docker)
Útil para desenvolvimento rápido de interface utilizando o servidor de desenvolvimento nativo do Node.js:
```bash
cd frontend
npm install
npm run dev
```

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
