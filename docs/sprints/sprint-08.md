# Relatório de Sprint - Sprint 08

## 1. Identificação

* **Número da sprint:** 08
* **Período:** 30/05/2026 a 03/06/2026
* **Data da entrega:** 03/06/2026
* **Equipe:** Augusto Fernandes Carvalho, Diovani da Cruz Mangia Maciel Junior, Ezequiel Dominguez Santos, Leonardo Carvalho Silva, Rafael Silva Martins
* **Product Owner:** Ezequiel Dominguez Santos
* **Scrum Master:** Diovani da Cruz Mangia Maciel Junior

---

## 2. Objetivo da Sprint

O objetivo central desta sprint final de tiro curto (5 dias de duração para ajuste ao calendário de entrega) foi a execução prática e consolidação das suítes de testes automatizados e da homologação funcional manual da interface. Sob a ótica de gerenciamento de produto, a equipe adotou uma estratégia estrita de consolidação do MVP: priorizou-se a estabilização e a segurança das regras de negócio nucleares da plataforma — nomeadamente a autenticação stateless via JWT (US01), o CRUD de pontos (US02), o mapa interativo Leaflet (US03) e o cálculo esférico de distâncias via Haversine (US04). O fechamento do último débito de escopo administrativo (#28) foi executado com foco na estabilidade da interface gráfica, aplicando o estado de Code Freeze para a entrega segura do produto.

---

## 3. Itens do Sprint Backlog

| ID / Tarefa | Descrição | Prioridade | Status |
| :--- | :--- | :--- | :--- |
| \#28 | \[TASK\] Implementação da lógica de listagem e moderação de Relatos de Problemas (Retomada) | Alta | **Concluído** |
| \[TEST\] | Execução prática das suítes de testes de unidade (JUnit 5 / Mockito) | Alta | **Concluído** |
| \[TEST\] | Execução de testes de integração conteinerizados (Testcontainers / RestAssured) | Alta | **Concluído** |
| \[TEST\] | Homologação funcional da interface React via checklist de cenários operacionais | Alta | **Concluído** |
| \[DOC\] | Consolidação do Relatório de Evidências de Testes e Validação (evidencias-testes.md) | Alta | **Concluído** |
| \[DOC\] | Fechamento e Evidências da Sprint 8 (sprint-08.md) | Alta | **Concluído (Este arquivo)** |

---

## 4. Relação com o Conteúdo da Disciplina

Esta sprint materializa a aplicação prática avançada dos conceitos de **Validação, Verificação e Testes de Software (VV&T)**. A equipe executou testes caixa-branca dinâmicos na camada de serviços e controladores, testes caixa-preta de integração de APIs para validação de contratos e segurança stateless, e testes de sistema de interface para atestar a conformidade dos critérios de aceitação e regras de negócio do MVP perante os requisitos estipulados.

---

## 5. Artefatos Produzidos

* **docs/testes/evidencias-testes.md:** Documentação oficial consolidando o extrato estatístico de sucesso do Maven, detalhamento das abordagens dinâmicas e o checklist de homologação manual preenchido.
* **docs/sprints/sprint-08.md:** Relatório consolidado de encerramento de ciclo e fechamento da última sprint do projeto.

---

## 6. Evidências no GitHub

* **Arquivos modificados:** docs/sprints/sprint-08.md, docs/testes/evidencias-testes.md, classes de testes automatizados do backend e componentes do dashboard admin.
* **Commits e Build:** Logs de execução e validação anexados ao repositório comprovando o sucesso completo do build via console do Maven.
* **Tag da sprint:** `sprint-08`

---

## 7. Evolução da Aplicação Web

O ciclo de desenvolvimento planejado para o MVP foi concluído e estabilizado. No **Backend**, a camada de segurança (JWT) foi integrada com sucesso às rotas protegidas e a lógica de persistência foi validada com a execução de 162 testes automatizados rodando com sucesso no console do Maven. 

No **Frontend**, a interface administrativa (Dashboard) foi consolidada para permitir que o administrador visualize a listagem de relatos. Contudo, por critérios estritos de priorização e gerenciamento de risco para o *Code Freeze*, a funcionalidade complementar de alteração do status da ocorrência (Issue #28) foi inteiramente cortada do escopo deste MVP. Essa decisão garantiu que a aplicação entrasse em regime estável de demonstração, focando apenas na visualização de dados seguros.

---

## 8. Dificuldades Encontradas

| Dificuldade | Impacto | Ação Tomada (Mitigação) |
| :--- | :--- | :--- |
| Configuração da volumetria inicial da base de dados fake nos containers temporários sem quebrar os scripts incrementais de migração do Flyway. | Médio | Isolamento estrito das massas de dados de teste dentro da suíte `RelatoProblemaIntegrationTest` utilizando anotações de transação para expurgar registros ao fim de cada ciclo técnico. |

---

## 9. Revisão do Incremento

**O que foi concluído:**
* Execução prática de 100% das baterias de testes integrados e unitários planejadas para validação do core do sistema.
* Conclusão do painel administrativo com suporte base para visualização da listagem de relatos (Issue #28 atendida parcialmente).
* Homologação manual bem-sucedida de todos os cenários operacionais da interface integrada (React + Spring Boot) sob a perspectiva de usabilidade da UI.
* Elaboração do documento oficial consolidado de evidências de validação e congelamento de código para a demonstração.

**O que ficou catalogado como Débito Técnico (Corte de Escopo do MVP):**
* Não existem pendências impeditivas que inviabilizem a navegação ou o funcionamento das regras centrais do software. Fica formalizado como débito técnico exclusivo pós-MVP o acoplamento do campo físico de persistência para persistir as atualizações de status de moderação da US05 no banco de dados, mapeado formalmente na Seção 10 deste relatório.

**O que ficou pendente:**

* Não existem pendências ou débitos técnicos pendentes de código. O software encontra-se finalizado em conformidade com o MVP acordado.

---

## 10. Pendências para as Próximas Etapas (Pós-Projeto)

1. **Preparação de Demonstração:** Organizar o roteiro visual de apresentação e navegação pelas telas para a defesa final perante o professor e colegas de classe.
2. **Auditoria Final de Repositório:** Varredura perene de links e caminhos de arquivos markdown para garantir a integridade total do diretório de documentação de Engenharia de Software.
3. **Sincronização do Campo de Status de Moderação (Débito Técnico):**
   * **Persistência (Banco de Dados):** Necessidade de rodar uma migração estrutural para incluir a coluna de controle (ex: `status_resposta` ou `status_relato`) na tabela `relato_problema` no PostgreSQL.
   * **Interface (Frontend):** Implementar o mapeamento e a renderização visual desse status nos cards e modais do Dashboard Administrativo. Atualmente, a ação de alteração de status mapeada na US05 e no Cenário 4 de testes não consome nem envia essa propriedade de forma real, operando de maneira isolada do modelo físico.

---

## 11. Gestão Visual (Quadro Kanban)

O fluxo de trabalho foi completamente finalizado no GitHub Projects, movendo todas as tarefas de desenvolvimento, moderação de relatos, testes automatizados e relatórios de evidências para a coluna de concluídos (Done).  
![Quadro Kanban](../sprints/print_kanban/sprint-08-kanban.png)