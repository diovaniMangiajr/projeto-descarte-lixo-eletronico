# projeto-descarte-lixo-eletronico

Plataforma web para localizar e cadastrar pontos de coleta de lixo eletrônico em Lavras-MG.

Este projeto é um trabalho da disciplina GCC188 - Engenharia de Software (2026/1), com foco em organização de informações, evolução incremental e apoio ao descarte correto.

## Visão Geral

O objetivo é centralizar informações sobre pontos de coleta de lixo eletrônico para que o cidadão encontre locais confiáveis de descarte e para que administradores mantenham os dados atualizados.

## Status do Projeto

Em desenvolvimento inicial.

## Público-Alvo

- Cidadãos que precisam localizar pontos de descarte.
- Administradores responsáveis por cadastrar e manter os pontos.

## Escopo do MVP

Funcionalidades priorizadas para a primeira versão:

- Listagem de pontos de coleta com filtros.
- Login de administrador.
- CRUD de pontos de coleta (criar, editar, excluir e listar).

## Roadmap

### Visualização e descoberta

- Mapa interativo para exibir pontos de coleta.
- Filtro por categoria de material aceito.
- Exibição de detalhes do ponto ao selecionar um marcador ou item da lista.
- Geolocalização do usuário para identificar o ponto mais próximo.

### Administração

- Dashboard simples com indicadores básicos, como quantidade de pontos por região.

### Funcionalidades futuras

- Sugestão de novo ponto por usuários.
- Roteirização para abrir o endereço em Google Maps ou Waze.
- Notificações por e-mail via SMTP.
- Página educativa sobre reciclagem e descarte correto.

## Stack Tecnológica

- Frontend: React + TypeScript
- Integração HTTP: Axios
- Backend: Java + Spring Boot
- Banco de dados: PostgreSQL

## Estrutura Prevista

A intenção é manter frontend e backend no mesmo repositório, com a documentação organizada na pasta `docs/`.

O frontend está isolado em `frontend/` para separar a aplicação da documentação e facilitar a evolução futura.

## Como Executar Localmente

### Frontend

Entre na pasta do frontend antes de executar os comandos:

```bash
cd frontend
```

1. Instale as dependências:

	```bash
	npm install
	```

2. Inicie o ambiente de desenvolvimento:

	```bash
	npm run dev
	```

3. Gere a build de produção:

	```bash
	npm run build
	```

4. Pré-visualize a build gerada:

	```bash
	npm run preview
	```

O frontend foi inicializado com Vite + React + TypeScript, React Router DOM e Axios.

### Estrutura do Frontend

- `frontend/src/app`: núcleo da aplicação e configuração de rotas.
- `frontend/src/components/layout`: componentes compartilhados de layout.
- `frontend/src/pages`: páginas organizadas por rota e contexto.
- `frontend/src/services/http`: cliente HTTP e integrações com API.
- `frontend/src/styles`: estilos globais da aplicação.

As rotas iniciais disponíveis são:

- `/mapa`
- `/admin`
- `/login`

A rota raiz `/` redireciona para `/mapa`.

Quando a base do backend estiver consolidada, esta seção será atualizada com:

- pré-requisitos (versões de Node.js, Java e PostgreSQL)
- comandos de instalação
- comandos de execução do frontend e do backend
- variáveis de ambiente necessárias

## Documentação

O projeto possui documentação na pasta `docs/`:

- Visão geral
- Backlog do produto
- Arquitetura
- Modelagem
- Padrões de projeto
- Decisões de projeto
- Sprints
- Plano e evidências de teste

## Contribuição

No momento, o desenvolvimento está restrito à equipe do projeto.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
