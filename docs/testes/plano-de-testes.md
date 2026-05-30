# **Plano de Testes de Software e Homologação Funcional \- V2**

**Documentação Estratégica da Sprint 7 — MVP Descarte de Lixo Eletrônico Lavras**  
**Equipe de Desenvolvimento e Qualidade:** Augusto Fernandes Carvalho, Diovani da Cruz Mangia Maciel Junior, Ezequiel Dominguez Santos, Leonardo Carvalho Silva, Rafael Silva Martins

## **1\. Introdução e Alinhamento Teórico (Base: Princípios de Testes de Software)**

Este documento estabelece a versão revisada e simplificada do Plano Estratégico de Testes e Garantia de Qualidade para a aplicação web de descarte de lixo eletrônico. O modelo técnico baseia-se nas diretrizes do Capítulo 8 da literatura de Engenharia de Software Moderna (Valente, 2020), estruturando-se através de uma **Pirâmide de Testes** otimizada para a capacidade operacional atual da equipe.  
A fim de otimizar o tempo de entrega e mitigar burocracias de recrutamento externo, a validação foi concentrada 100% dentro do ambiente interno do time de desenvolvimento, eliminando protocolos demográficos e testes empíricos de usabilidade de IHC. A pirâmide de qualidade foi redefinida em três frentes:

* **Base da Pirâmide — Testes de Unidade (Unit Tests):** Validação isolada de lógicas de negócio no Backend com o framework JUnit e objetos Mock (Mockito).  
* **Camada Intermediária — Testes de Integração e Contrato de APIs:** Verificação da conectividade com o banco PostgreSQL real através do uso de **Testcontainers (Docker)** e integridade de endpoints via API Cat.  
* **Topo da Pirâmide — Testes de Sistema Funcionais (Caixa-Preta):** Homologação manual de ponta a ponta na interface em React por meio da metodologia de **Revisão por Pares (Peer Review)**, executando cenários baseados nos requisitos do MVP.

## **2\. Estratégia de Testes do Backend (Automatizados e Conteinerizados)**

### **2.1. Testes de Unidade com JUnit e Mocks**

Os testes unitários focam estritamente na camada de serviços (@Service). Utiliza-se o Mockito para isolar a camada de persistência, simulando retornos ideais e caminhos de exceção sem realizar escritas no banco de dados, garantindo testes rápidos e independentes.

### **2.2. Testes de Integração Conteinerizados (Testcontainers \+ PostgreSQL)**

Para validar com fidelidade absoluta o comportamento dos repositórios (JpaRepository) e mapeadores de entidades (Hibernate), os testes de integração do backend levantarão de forma temporária e automatizada um container Docker do PostgreSQL real via biblioteca **Testcontainers**. Essa abordagem valida se os scripts incrementais de migração do Flyway executam sem quebras, e se os relacionamentos complexos N:N de pontos de coleta e categorias persistem de forma íntegra na base de dados lógicos.

### **2.3. Validação de Contrato de APIs com API Cat**

Os controladores REST (@RestController) passam por testes funcionais de caixa-preta via ferramenta API Cat. O objetivo é conferir a conformidade dos payloads JSON e a barreira de segurança imposta pelos filtros do Spring Security (validação do token JWT, testando o bloqueio de requisições malformadas ou não autenticadas).

## **3\. Estratégia de Testes de Sistema e Interface (Caixa-Preta por Revisão por Pares)**

Substituindo o protocolo pesado de usabilidade externa, o topo da pirâmide adota os **Testes Alfa Funcionais**. A validação do front-end em React é distribuída entre os próprios membros da equipe técnica seguindo a lógica cruzada: quem implementou uma funcionalidade não pode homologá-la. Esse método garante que defeitos de layout, falhas de integração com Axios e caminhos alternativos sejam capturados antes da entrega final ao professor.

## **4\. Roteiro de Cenários e Checklist de Homologação Interna**

O time executará manualmente a interface integrada para preencher o seguinte checklist binário (**Passou / Falhou**), acompanhado de evidências visuais (prints das telas):

| Cenário ID | Fluxo de Ação Técnica Executado | Resultado Esperado (Critério de Aceite) | Avaliador Par   |
| :---- | :---- | :---- | :---- |
| **Cenário 1** | Acessar a tela inicial pública e utilizar os controles interativos do mapa (Leaflet) e a listagem responsiva para localizar ecopontos na cidade de Lavras. | Os "pins" devem aparecer renderizados nas posições geográficas exatas vindas da API pública do banco de dados. | (Augusto / Ezequiel) |
| **Cenário 2** | Interagir com um marcador específico de ecoponto no mapa e, no modal de detalhes expandido, preencher o formulário público com um aviso de "Coletor Lotado". | O feedback deve ser enviado sem necessidade de login, disparando mensagem de sucesso visual na tela. | (Rafael / Leonardo) |
| **Cenário 3** | Acessar a rota protegida do Admin (/admin), forçar login informando credenciais válidas e submeter o cadastro completo de um novo ecoponto associado a múltiplas categorias. | O Spring Security deve validar o token JWT e salvar o novo ponto no PostgreSQL, atualizando o dashboard imediatamente. | Equipe Frontend (Augusto / Rafael) |
| **Cenário 4** | Navegar pelo painel de monitoramento administrativo do Dashboard e executar a alteração de status do feedback recebido no Cenário 2 de "Pendente" para "Resolvido". | A API de moderação (PUT/PATCH) deve atualizar a base relacional de dados e emitir um toast de sucesso. | Scrum Master (Diovani) |

## **5\. Matriz de Rastreabilidade Simplificada Atualizada (Requisitos vs. Suítes)**

Esta tabela mapeia de ponta a ponta as Histórias de Usuário originais do MVP em relação a todas as camadas de cobertura de testes técnicos configuradas internamente pelo time:

| História de Usuário (ID) | Teste Unitário (JUnit) | Teste de API / Integração | Teste de Sistema (Caixa-Preta Interno)   |
| :---- | :---- | :---- | :---- |
| **US01:** Autenticação e Segurança de Admin | Verificar hashing BCrypt de credenciais. | Testar validação do JWT em filtros HTTP via API Cat. | Fluxo de login obrigatório para acesso aos Cenários 3 e 4\. |
| **US02:** Gestão de Pontos de Coleta | Validar lógica de persistência com mocks de Repositories. | Testar persistência no banco PostgreSQL real com Testcontainers. | **Cenário 3:** Cadastro completo de novo ponto via painel admin. |
| **US03:** Visualização de Pontos | Validar conversão de objetos para DTOs. | Verificar payload de resposta leve na rota pública GET /api/pontos. | **Cenário 1:** Renderização espacial de ecopontos e leitura de cards. |
| **US04:** Detalhes e Geolocalização | Testar cálculo matemático de distância (Haversine). | Validar injeção de dados de endereço estruturados no JSON público. | **Cenário 1:** Abertura do modal expansível contendo as informações lógicas do local. |
| **US05:** Gestão Administrativa de Ocorrências | Validar fluxo lógico de alteração de status na camada Service. | Testar chamadas restritas com JWT em rota PUT /api/feedbacks/{id} | **Cenário 4:** Triagem e moderação manual de alertas no Dashboard. |
| **US06:** Registro Público de Feedback | Validar restrições de validação do DTO de entrada. | Disparos funcionais abertos no endpoint público POST /api/feedbacks. | **Cenário 2:** Submissão de alerta de manutenção na visão do cidadão. |

## **6\. Gestão de Defeitos e Critérios de Aceite**

Qualquer comportamento adverso ou inconsistência encontrada pelos avaliadores internos durante a execução das suítes de testes (seja quebra de contrato JSON no API Cat, falhas de persistência no Testcontainers ou erros visuais no React) não será ignorado. O Scrum Master registrará imediatamente o defeito gerando um card etiquetado como **"Bug/Defeito"** no Kanban do GitHub Projects, bloqueando o merge da funcionalidade até que a equipe realize a correção.