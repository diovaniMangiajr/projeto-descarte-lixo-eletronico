# Evidências de Testes e Validação - Sprint 8

Este documento consolida os resultados da execução do Plano de Testes (V2) para a aplicação web de descarte de lixo eletrônico, com o objetivo de apresentar as evidências técnicas exigidas pelos critérios de avaliação 10.3 e 10.4.

As rotinas executadas abrangeram desde a verificação estrutural do código-fonte (backend) até a validação do comportamento da interface gráfica (frontend), buscando confirmar se os Requisitos Funcionais estipulados foram atendidos no Nível de Sistema.

---

## 1. Relatório Estatístico de Execução (Console Maven)

Abaixo está o extrato final emitido pelo plugin `maven-surefire` após a varredura completa das classes de teste de unidade e de integração automatizada, totalizando 100% de sucesso nos cenários lógicos avaliados:

```text
[INFO] Running com.backend.api.descarteeletronico.integration.PontoColetaIntegrationTest
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.519 s -- in com.backend.api.descarteeletronico.integration.PontoColetaIntegrationTest
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 162, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:02 min
[INFO] Finished at: 2026-06-03T15:51:16-03:00
[INFO] ------------------------------------------------------------------------
```

*(Nota: O sucesso do Build comprova que não existem falhas - comportamentos incorretos observados - bloqueantes nas camadas de persistência e negócio).*

---

## 2. Abordagens de VV&T Dinâmicas Implementadas (Backend)

O backend em Spring Boot utilizou as mais modernas ferramentas do ecossistema Java para automatizar as rotinas dinâmicas de Validação e Verificação.

### 2.1. Testes de Unidade (Caixa-Branca)
Testes focados em isolar as classes de suas dependências externas para verificar algoritmos internos e a cobertura de comandos e decisões.
* **Ferramentas utilizadas:** `JUnit 5` (Jupiter) e `Mockito`.
* **Escopo:** Camadas `@Service` e classes de Domínio (ex: `UsuarioTest`).
* **Justificativa:** Através dos `Mocks`, garantimos que as regras de cálculo e validação estivessem corretas (ex: validação de senhas) sem poluir ou depender de conexões de rede.

### 2.2. Testes de Componente / Controladores HTTP
Validam a camada de transporte REST simulando requisições internas, sem abrir portas de rede reais.
* **Ferramenta utilizada:** `MockMvc` integrado ao Spring Test.
* **Escopo:** Camada `@RestController` (ex: `ExemploControllerTest`, `NotificacaoControllerTest`).
* **Justificativa:** Garantir o correto tratamento das exceções (via `@ControllerAdvice` global) e que as anotações do framework devolvem os *Status Codes* (200, 201, 400) exigidos pelos contratos da API.

### 2.3. Testes de Integração de API (Caixa-Preta Automatizada)
A avaliação mais crítica. Levanta o contexto do Spring Boot e testa o banco de dados ponta a ponta.
* **Ferramentas utilizadas:** `RestAssured`, `Spring Boot DataJpaTest` e ambiente nativo com migrações `Flyway`.
* **Escopo:** Endpoints complexos (ex: `AuthIntegrationTest`, `FeedbackIntegrationTest`).
* **Justificativa:** A biblioteca `RestAssured` age como um cliente HTTP "cego" (Testador Caixa-Preta). Ele injeta um payload via POST e exige o JSON correto na saída. Além disso, as suítes da camada *Repository* validam se as lógicas do Hibernate JPA convertem perfeitamente as entidades para as tabelas gerenciadas pelo PostgreSQL.

---

## 3. Homologação Nível de Sistema (Testes Manuais)

A camada superior da pirâmide de testes não utilizou automação via código, mas sim rotinas guiadas por roteiros humanos (Teste Alfa de Interface), validando os Requisitos de Negócio sob a perspectiva do cliente.

### 3.1. VV&T de Endpoints via API Cat / Postman
* **Abordagem:** Teste Funcional (Caixa-Preta) no Nível de Sistema.
* **Execução:** O time organizou coleções contendo os Endpoints de negócio do sistema. Variando as entradas lógicas (Payload válido, campos vazios e ausência de Token JWT), verificamos as barreiras de segurança do *Resource Server* e as respostas HTTP.
* **Resultado:** O sistema confirmou a integridade *stateless*, protegendo adequadamente as rotas restritas e processando corretamente os payloads públicos.

**Evidências Visuais:**

![Execução do Endpoint de Login](https://github.com/user-attachments/assets/09912c73-c627-43b6-9cd8-353f8aceeea6)
*Figura 1: Teste caixa-preta do endpoint `/api/v1/auth/login` validando o retorno do token JWT após o envio de credenciais válidas.*

![Execução do Endpoint de Feedback](https://github.com/user-attachments/assets/bdfb516f-b53d-443a-b049-f9ace5ce7d6c)
*Figura 2: Submissão do payload de relato de problema via POST, atestando o comportamento de inserção e a conformidade do JSON de resposta (Status 201 Created).*

### 3.2. Homologação da Interface (SPA em React)
Por meio do protocolo interno de Revisão de Pares Cruzada (*Peer Review*), os membros testaram os componentes de apresentação integrados ao servidor local.

| ID | Cenário Operacional Executado (Ação) | Resultado Validado (Saída Esperada) | Avaliação |
| :--- | :--- | :--- | :--- |
| **C1** | Localização de ecopontos em Lavras/MG via mapa Leaflet. | Pins renderizados corretamente a partir de dados geográficos originários da API Pública (GET). | **PASSOU** |
| **C2** | Envio de aviso de "Coletor Lotado" no modal público de detalhes. | Disparo de payload anônimo aceito com sucesso pela API e exibição de alerta de confirmação na UI. | **PASSOU** |
| **C3** | Cadastro de novo ponto integrado a múltiplas categorias (Painel Admin). | Autenticação efetiva (verificação via JWT armazenado localmente) e renderização imediata do novo Ecoponto. | **PASSOU** |
| **C4** | Alteração de status da ocorrência. | Moderação concluída e processamento da notificação, refletindo a remoção do alerta no dashboard principal. | **PASSOU** |

**Conclusão da Etapa de Testes:** Com a execução das suítes automatizadas e a validação manual dos cenários previstos, a equipe encerra a fase de implementação e verificação do MVP. O repositório entra agora no estado de *Code Freeze*, e a versão atual encontra-se consolidada para a etapa de demonstração final.
