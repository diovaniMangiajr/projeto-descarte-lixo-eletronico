# **Plano de Testes de Software e Homologação Funcional \- V3**

**Documentação Estratégica de Garantia de Qualidade — MVP Descarte de Lixo Eletrônico**

**Equipe de Desenvolvimento e Qualidade:** Augusto Fernandes Carvalho, Diovani da Cruz Mangia Maciel Junior, Ezequiel Dominguez Santos, Leonardo Carvalho Silva, Rafael Silva Martins

## **1\. Introdução e Alinhamento Teórico**

Este documento estabelece a estratégia formal de Testes e Garantia de Qualidade para a aplicação web de descarte de lixo eletrônico. O modelo técnico baseia-se nas diretrizes do Capítulo 8 da literatura de Engenharia de Software Moderna (Valente, 2020), estruturando-se através de uma **Pirâmide de Testes** focada em eficiência e cobertura lógica completa.

A validação foi concentrada de forma interna através de testes dinâmicos automatizados no backend e homologação funcional cruzada na interface do cliente, distribuída em três níveis de granularidade:

* **Base da Pirâmide — Testes de Unidade (Unit Tests):** Validação isolada de lógicas de negócio e restrições sintáticas com JUnit e objetos Mock.  
* **Camada Intermediária — Componentes e Integração de APIs:** Verificação do comportamento das rotas HTTP, validação de contratos estruturais de payloads e persistência em banco PostgreSQL conteinerizado via Docker.  
* **Topo da Pirâmide — Testes de Sistema Funcionais (Caixa-Preta):** Homologação manual de ponta a ponta guiada por roteiros operacionais executados na interface em React.

## **2\. Estratégia de Testes do Backend (Automatizados e Dinâmicos)**

### **2.1. Testes de Unidade com JUnit e Mocks**

Os testes unitários focam de forma isolada nas lógicas de processamento interno da aplicação.

* **Ferramentas:** JUnit 5 e Mockito.  
* **Escopo Técnico:** Validação das regras da camada @Service e integridade das regras das entidades de domínio, como a classe UsuarioTest.  
* **Abordagem:** Uso de objetos simulados (Mocks) para isolar a persistência, garantindo a validação de caminhos lógicos de sucesso e exceções.

### **2.2. Testes de Componente (Controladores HTTP)**

Validam se o comportamento do servidor de API responde corretamente sob o protocolo de comunicação de rede.

* **Ferramentas:** MockMvc integrado ao Spring Test.
* **Escopo Técnico:** Interceptação da camada @RestController, cobrindo classes de controle como PontoColetaControllerTest e NotificacaoControllerTest.
* **Abordagem:** Garantir o correto disparo dos códigos de status HTTP (200, 201, 400) e a captura centralizada de erros pelo manipulador global de exceções.

### **2.3. Testes de Integração de API (Conteinerizados)**

Verificam o acoplamento do código-fonte com os mecanismos reais de persistência e segurança.

* **Ferramentas:** RestAssured, Spring Boot DataJpaTest, scripts de migração Flyway e Testcontainers.
* **Escopo Técnico:** Fluxos complexos de escrita e barreiras de segurança, com foco nas classes AuthIntegrationTest e PontoColetaIntegrationTest.
* **Abordagem:** O Testcontainers levanta uma instância isolada e real do PostgreSQL em um container Docker. A biblioteca RestAssured simula requisições caixa-preta de ponta a ponta, avaliando as travas de token JWT e a gravação relacional de tabelas como ponto_coleta e relato_problema.

## **3\. Estratégia de Testes de Sistema e Interface**

### **3.1. Validação de Contrato via API Cat / Postman**

* **Abordagem:** Teste Funcional Caixa-Preta no Nível de Sistema.  
* **Execução:** Submissão de chamadas manuais contra os endpoints locais do servidor em modo *stateless*. Avalia-se a resposta da API variando dados lógicos de entrada, conferindo a geração de tokens e o bloqueio de requisições sem credenciais.

### **3.2. Homologação da Interface (SPA em React)**

* **Abordagem:** Teste Alfa Funcional por Revisão de Pares Cruzada (*Peer Review*).  
* **Execução:** Os componentes de visualização integrados (Axios client) são distribuídos entre os membros da equipe técnica. O desenvolvedor encarregado de codificar uma funcionalidade não pode ser o mesmo que executa seu roteiro de homologação.

## **4\. Roteiro de Cenários e Checklist de Homologação Interna**

O time executará de forma integrada os seguintes fluxos operacionais para preenchimento de conformidade de critérios de aceitação:

| Cenário ID | Fluxo de Ação Técnico Executado | Resultado Esperado (Critério de Aceite) | Avaliador Par |
| :---- | :---- | :---- | :---- |
| **Cenário 1** | Acessar a tela inicial pública e interagir com o mapa Leaflet e a listagem responsiva para localizar pontos de coleta em Lavras/MG. | Os marcadores geográficos devem aparecer plotados nas posições exatas obtidas a partir dos dados retornados da API pública (GET). | (Augusto / Ezequiel) |
| **Cenário 2** | Selecionar um ponto de coleta específico no mapa, abrir o modal de detalhes e submeter um aviso de lixeira cheia (enviando a constante `LIXEIRA_CHEIA` via payload JSON) fornecendo nome e e-mail. | O sistema deve validar a identificação obrigatória do cidadão, aceitar o payload e emitir um alerta visual de sucesso na UI. | (Rafael / Leonardo) |
| **Cenário 3** | Acessar a rota /admin, efetuar login com credenciais válidas e submeter o formulário de um novo ponto de coleta associado a múltiplos tipos de produtos. | O sistema deve armazenar o token JWT localmente, validar as permissões de acesso, gravar o ponto no PostgreSQL e renderizá-lo de imediato no dashboard. | Equipe Frontend (Augusto / Rafael) |
| **Cenário 4** | Navegar pelo painel de monitoramento do painel administrativo e alterar o status do relato recebido no Cenário 2 de "Pendente" para "Resolvido". | A interface gráfica deve simular localmente a alteração de status do relato no estado do componente de tela e atualizar visualmente o dashboard. (Nota de Escopo: A persistência física deste status no PostgreSQL foi postergada para o pós-MVP, operando de forma simulada no frontend).| Scrum Master (Diovani) |
| **Cenário 5** | Bloquear a conexão de rede com o provedor externo do mapa Leaflet e carregar a página inicial pública do sistema. | A interface React deve interceptar a falha de carregamento da API de terceiros, manter-se estável e exibir uma mensagem amigável de erro ao cidadão (conforme RNF08). | Equipe Frontend (Leonardo/Ezequiel) |
| **Cenário 6** | Acessar a plataforma e verificar a solicitação de uso de dados de geolocalização do navegador. | O sistema deve disparar o prompt de consentimento explícito e tratar adequadamente o cenário caso o usuário recuse (conforme RNF07). | (Leonardo / Ezequiel) |
| **Cenário 7** | Acessar o painel de administração e executar o fluxo de criação, edição e exclusão de um Tipo de Produto isolado. | A API deve processar as alterações na tabela `tipo_produto` independentemente do formulário de pontos de coleta (conforme RF05). | (Augusto / Rafael) |
| **Cenário 8** | Acessar a aplicação pública através dos navegadores Google Chrome, Mozilla Firefox e Microsoft Edge. | A renderização do mapa, dos componentes interativos e dos cards deve ocorrer sem quebras de layout (conforme RNF03). | (Leonardo / Ezequiel) |
| **Cenário 9** | Inspecionar a aba Network do navegador (DevTools) durante o carregamento inicial da página pública. | O download dos dados de pontos de coleta deve ocorrer de forma assíncrona, sem bloquear a renderização inicial da interface de usuário (conforme RNF05). | (Augusto / Rafael) |

## **5\. Matriz de Rastreabilidade Estratégica (Requisitos vs. Suítes)**

Esta matriz demonstra o mapeamento completo e a amarração de cobertura de qualidade entre as User Stories de negócio e as suítes técnicas executadas:

| História de Usuário (ID) | Teste Unitário (JUnit) | Teste de API / Integração | Teste de Sistema (Interface e API Cat) |
| :---- | :---- | :---- | :---- |
| **US01:** Autenticação e Segurança de Admin | Verificar hashing BCrypt de armazenamento de credenciais. | Testar filtros de segurança e validação sintática do token JWT. | Fluxo de login obrigatório para acesso aos Cenários operacionais 3 e 4, e validação de Logout (encerramento de sessão e bloqueio subsequente de rotas). |
| **US02:** Gestão de Pontos de Coleta | Validar a lógica de persistência e validações isolando repositórios com mocks. | Testar o ciclo completo do CRUD na base PostgreSQL real via Testcontainers, incluindo testes de contorno defensivos contra inserção de coordenadas geográficas inválidas (conforme RNF02). | **Cenário 3:** Inserção e gravação em tempo real de um novo ponto no dashboard. |
| **US03:** Visualização de Pontos | Validar o mapeamento estrutural de entidades de domínio para DTOs públicos. | Verificar o tempo de resposta e payload leve na rota pública GET /api/pontos. | **Cenário 1:** Renderização espacial e leitura dos cartões responsivos na tela inicial. |
| **US04:** Detalhes e Geolocalização | Testar algoritmo matemático da Fórmula de Haversine para cálculo de distâncias. | Validar formatação e injeção correta de dados geográficos estruturados no JSON público. | **Cenário 1:** Abertura do modal expansível contendo dados de funcionamento e restrições. |
| **US05:** Gestão de Tipos de Produtos e Relatos de Problemas | Validar fluxo de alteração de status e acionamento lógico da notificação na camada Service. | Testar chamadas restritas com JWT no endpoint `/api/relatos-problemas/{id}` e trigger de notificações em `RelatoProblemaIntegrationTest`. | **Cenário 4 e Cenário 7:** Triagem, moderação de alertas no Dashboard e gerenciamento de tipos de produtos. |
| **US06:** Registro de Relato de Problema de Campo | Validar travas sintáticas e obrigatoriedade de campos (nome/email preenchidos) no DTO. | Executar disparos lógicos no endpoint público de submissão de relatos de problemas em `RelatoProblemaIntegrationTest`. | **Cenário 2:** Preenchimento identificado e envio do formulário de ocorrência na visão do cidadão. |

## **6\. Gestão de Defeitos e Critérios de Aceite**

Qualquer comportamento inesperado detectado nas execuções (quebra de contratos JSON no API Cat, falhas de constraints no Testcontainers ou erros na renderização do React) será tratado como falha impeditiva. O Scrum Master abrirá uma issue com a tag **"Bug/Defeito"** no Kanban do GitHub Projects, blocking o merge da funcionalidade até que a correção seja efetuada e validada novamente pelas suítes automatizadas.

