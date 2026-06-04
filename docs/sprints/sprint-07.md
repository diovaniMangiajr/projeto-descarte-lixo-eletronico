# Relatório de Sprint - Sprint 07

## 1. Identificação

* **Número da sprint:** 07
* **Período:** 23/05/2026 a 30/05/2026
* **Data da entrega:** 30/05/2026
* **Equipe:** Augusto Fernandes Carvalho, Diovani da Cruz Mangia Maciel Junior, Ezequiel Dominguez Santos, Leonardo Carvalho Silva, Rafael Silva Martins
* **Product Owner:** Ezequiel Dominguez Santos
* **Scrum Master:** Diovani da Cruz Mangia Maciel Junior

---

## 2. Objetivo da Sprint

O objetivo principal desta etapa foi o planejamento estratégico e a modelagem da infraestrutura de qualidade do projeto (fase de arquitetura de testes), em paralelo com a eliminação total dos débitos técnicos de interface com o cidadão. O foco esteve em consolidar a integração do mapa dinâmico em React com a API pública do ecossistema, mapear os cenários de testes automatizados e desenhar o roteiro de homologação funcional interna.

---

## 3. Itens do Sprint Backlog

| ID / Tarefa | Descrição | Prioridade | Status |
| :--- | :--- | :--- | :--- |
| \[DOC\] | Elaboração do Plano e Cenários de Testes (plano-de-testes.md) | Alta | **Concluído** |
| \#21 | \[TASK\] Configuração do mapa base e renderização de markers dinâmicos (Retomada) | Média | **Concluído** |
| \#23 | \[TASK\] Integração com o endpoint de listagem pública de pontos (Retomada) | Alta | **Concluído** |
| \#26 | \[TASK\] Criação da tela/modal de detalhes do ponto de coleta (Retomada) | Alta | **Concluído** |
| \#32 | \[TASK\] Implementação de validações básicas (anti-spam / campos obrigatórios) | Média | **Concluído** |
| \[DOC\] | Revisão Geral e Auditoria da Documentação do Projeto | Média | **Constante / Em Andamento** |
| \#28 | \[TASK\] Implementação da lógica de listagem e moderação de Relatos de Problemas (Update status) | Média | **Pendente / Adiado** |
| \[DOC\] | Fechamento e Evidências da Sprint 7 (sprint-07.md) | Alta | **Concluído (Este arquivo)** |

---

## 4. Relação com o Conteúdo da Disciplina

Esta sprint conecta-se de forma direta ao módulo de **Testes e Garantia de Qualidade de Software**. A equipe aplicou os conceitos de Pirâmide de Testes (Valente, Cap. 8) mapeando testes de unidade para as regras de negócio de serviços no backend, testes funcionais de caixa-preta para assegurar a integridade e contratos lógicos de endpoints de APIs e estruturou os cenários de testes de sistema (homologação alfa interna por revisão cruzada) para cobrir os critérios de aceite do cliente.

---

## 5. Artefatos Produzidos

* **docs/testes/plano-de-testes.md:** Documentação oficial atualizada (V3), consolidando a estratégia de JUnit, Mocks, Testcontainers, API Cat e a matriz simplificada de rastreabilidade para homologação técnica interna.
* **docs/sprints/sprint-07.md:** Relatório de acompanhamento, métricas e fechamento de ciclo da sprint.

---

## 6. Evidências no GitHub

* **Arquivos modificados:** docs/sprints/sprint-07.md, docs/testes/plano-de-testes.md, códigos de componentes e integração do mapa React.
* **Tag da sprint:** sprint-07
* **Reunião:** Esse documento é apenas para entrega no campus virtual. A equipe decidiu realizar uma única sprint de testes (7 e 8) em uma só.

---

## 7. Evolução da Aplicação Web

Houve uma evolução substancial no **Frontend** da visão pública do cidadão. O mapa interativo baseado em Leaflet foi configurado, centralizado em Lavras/MG e devidamente integrado via Axios para renderizar marcadores dinâmicos a partir de dados reais do PostgreSQL. O modal expansível de detalhamento foi finalizado, permitindo visualizar endereço e tipos de produtos de cada ecoponto e realizar o envio do formulário com validações embutidas e travas sintáticas contra dados nulos e spams. Adicionados validadores de campos obrigatórios no DTO de relatos de problemas públicos do cidadão.

---

## 8. Dificuldades Encontradas

| Dificuldade | Impacto | Ação Tomada (Mitigação) |
| :--- | :--- | :--- |
| Alta complexidade logística e tempo escasso para a aplicação em massa do roteiro original de usabilidade externa de IHC (recrutamento, gravação e métricas estatísticas SUS). | Alto | O Scrum Master liderou a simplificação do plano de validação para um modelo de Teste de Sistema Alfa por Revisão de Pares Técnicos (Peer Review). Isso removeu a sobrecarga burocrática, mantendo o foco analítico nos cenários lógicos e na captura de falhas reais do código. |

---

## 9. Revisão do Incremento

**O que foi concluído:**

* Plano de testes estratégicos estruturado e revisado com foco em homologação interna (V3).
* Zera dos débitos técnicos de mapas, listagem pública de pontos e modal detalhado em React.
* Adicionados validadores de campos obrigatórios no DTO de relatos de problemas públicos do cidadão.

**O que ficou pendente (Débito Técnico para a Sprint 8):**

* A issue **\#28** (Listagem e moderação administrativa de relatos de problemas) foi transferida para a próxima sprint devido ao esforço de tempo concentrado na integração de mapas e amarração da arquitetura técnica de testes.
* A issue de auditoria geral de documentação permanece ativa, operando de forma perene por todas as sprints.

---

## 10. Pendências para a Próxima Sprint (Sprint 8)

1. **Execução Prática das Suítes:** Rodar as baterias de testes unitários com JUnit/Mockito e coletar o relatório de cobertura de código (Code Coverage / JaCoCo).
2. **Validação de Integração e APIs:** Executar as rotas funcionais com Docker/Testcontainers no PostgreSQL e exportar os logs do API Cat.
3. **Homologação do Checklist Visual:** Rodar a revisão por pares cruzada nos 4 cenários funcionais da interface React e computar a tabela de Passou/Falhou com capturas de telas.
4. **Finalização de Escopo:** Concluir a tela administrativa pendente de moderação de relatos de problemas (\#28).

---

## 11. Gestão Visual (Quadro Kanban)

O fluxo de trabalho foi atualizado no GitHub Projects, movendo as frentes concluídas de mapas e planos de testes para a coluna de finalizados (Done) e remapeando as pendências estruturadas.  
![Quadro Kanban](../sprints/print_kanban/sprint-07-kanban.png)