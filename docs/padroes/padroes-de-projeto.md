# Documentação Consolidada de Padrões de Projeto (Sprint 5)

Este documento centraliza a identificação, análise e justificativa técnica dos padrões de projeto (*Design Patterns*) e padrões arquiteturais adotados em todas as camadas da aplicação web **Descarte de Lixo Eletrônico Lavras**. A arquitetura segue o modelo *Client-Server* via comunicação RESTful.

---

## 1. Camada Front-End (React + Vite + TypeScript)

O Front-end utiliza padrões focados em reatividade, composição de interface e isolamento de rotas e serviços.

### 1.1. Component Pattern / Composite Variant
* **Tipo:** Padrão Arquitetural de Interface
* **Onde foi usado:** Em toda a interface, mas visivelmente em páginas complexas como `AdminPage.tsx` e `MapaPage.tsx`, que encapsulam subcomponentes como `PointFormModal` e `DeleteConfirmModal`.
* **Justificativa Técnica:** Permite a quebra da interface em unidades modulares, independentes e altamente reutilizáveis. Reduz a complexidade ciclomática dos arquivos de visualização e facilita a manutenção isolada de cada pedaço da tela.

### 1.2. Observer Pattern
* **Tipo:** GoF Behavioral (Comportamental)
* **Onde foi usado:** Em componentes interativos através dos hooks nativos do React (`useState` e `useEffect`).
* **Justificativa Técnica:** Garante o fluxo reativo da aplicação. Os componentes (observadores) assinam o estado; quando o estado sofre mutação, a árvore de componentes é notificada e re-renderizada automaticamente, eliminando a manipulação imperativa do DOM.

### 1.3. Provider Pattern
* **Tipo:** Padrão de Design de Interfaces / Gerenciamento de Estado Global
* **Onde foi usado:** No arquivo raiz `App.tsx` (ex: `<ThemeProvider>`) e `main.tsx` (`<BrowserRouter>`).
* **Justificativa Técnica:** Permite o compartilhamento de dados transversais (como o tema de cores ou histórico de navegação) por toda a árvore de componentes, resolvendo o problema de *prop drilling* (passagem exaustiva de propriedades por múltiplos níveis).

### 1.4. Front Controller / Router Pattern
* **Tipo:** Padrão Arquitetural de Navegação
* **Onde foi usado:** No arquivo `AppRoutes.tsx` e `paths.ts`, utilizando o React Router DOM.
* **Justificativa Técnica:** Centraliza o despacho de rotas da aplicação (Front Controller). O uso do arquivo `paths.ts` atua como um *Registry* estático, garantindo que as URLs do sistema sejam tipadas e mapeadas em um único local, evitando quebras de links.

### 1.5. Singleton / Factory Pattern
* **Tipo:** GoF Creational (Criação)
* **Onde foi usado:** No arquivo `src/services/api.ts` na inicialização do Axios (`axios.create`).
* **Justificativa Técnica:** Garante que toda a aplicação consuma a mesma instância pré-configurada de comunicação HTTP (com a `baseURL` correta do ambiente). Evita redundância na configuração de cabeçalhos e *timeouts*.

---

## 2. Camada Back-End (Java + Spring Boot)

O Back-end é fundamentado em padrões clássicos do GoF e padrões corporativos (PoEAA) para garantir baixo acoplamento e separação de responsabilidades.

### 2.1. Inversão de Controle (IoC) e Injeção de Dependência (DI)
* **Tipo:** Padrão Arquitetural / Creational
* **Onde foi usado:** Na anotação de componentes (`@RestController`, `@Service`, `@Repository`) e injeção via construtor.
* **Justificativa Técnica:** O Spring Container gerencia o ciclo de vida dos objetos (Beans). Isso reduz o acoplamento, pois as classes não instanciam suas dependências diretamente (`new`), facilitando a modularidade e a criação de testes unitários com *mocks*.

### 2.2. Singleton Pattern
* **Tipo:** GoF Creational (Criação)
* **Onde foi usado:** Nativo do Spring. Todos os *Beans* de serviço e controle são singletons por padrão.
* **Justificativa Técnica:** Otimiza o uso de memória e processamento. Como as classes de serviço não guardam estado de usuário (*stateless*), uma única instância é suficiente para atender a todas as requisições HTTP simultâneas.

### 2.3. Proxy Pattern
* **Tipo:** GoF Structural (Estrutural)
* **Onde foi usado:** Em métodos e classes anotados com `@Transactional` (ou módulos de segurança como o Spring Security).
* **Justificativa Técnica:** O framework cria um "espião" (Proxy) em volta da classe original para interceptar a execução e injetar lógicas transversais (como abrir e *commitar* uma transação no banco de dados) sem poluir o código da regra de negócio.

### 2.4. Data Transfer Object (DTO)
* **Tipo:** Padrão Corporativo (J2EE)
* **Onde foi usado:** Na camada de transporte (Controllers), mapeando requisições e respostas (ex: `PointRequestDTO`, `PointResponseDTO`).
* **Justificativa Técnica:** Evita a exposição direta das entidades do banco de dados na API. O DTO modela exatamente o payload JSON que trafega na rede, blindando o banco de dados contra manipulações indevidas e reduzindo o tráfego de dados desnecessários (over-fetching).

### 2.5. Chain of Responsibility / Interceptor (Global Exception Handler)
* **Tipo:** GoF Behavioral (Comportamental)
* **Onde foi usado:** No tratamento de erros globais da API usando `@ControllerAdvice` e `@ExceptionHandler`.
* **Justificativa Técnica:** Intercepta exceções lançadas em qualquer lugar da aplicação e as padroniza antes de enviar a resposta HTTP ao Front-end. Elimina a necessidade de blocos `try-catch` repetitivos nos controllers.

---

## 3. Camada de Dados / Persistência (PostgreSQL + JPA)

A comunicação entre a aplicação orientada a objetos (Java) e o banco de dados relacional (PostgreSQL) exige padrões estruturais específicos para resolver a "impedância" entre os dois mundos.

### 3.1. Repository Pattern
* **Tipo:** Padrão Arquitetural Corporativo (Domain-Driven Design / PoEAA)
* **Onde foi usado:** Nas interfaces que estendem `JpaRepository` no Spring Data.
* **Justificativa Técnica:** Isola a camada de domínio e negócio da complexidade de acesso a dados. O padrão atua como uma coleção de objetos em memória para o restante da aplicação, ocultando a infraestrutura de queries SQL e dialetos específicos do PostgreSQL.

### 3.2. Data Mapper
* **Tipo:** Padrão de Persistência (PoEAA)
* **Onde foi usado:** Implementado intrinsecamente pelo framework Hibernate (provedor JPA). As classes anotadas com `@Entity`.
* **Justificativa Técnica:** Diferente do padrão *Active Record* (onde a classe sabe como se salvar no banco), no Data Mapper a entidade é um objeto Java puro. O mapeador (Hibernate) é responsável por transferir os dados entre os objetos e as tabelas do banco de forma transparente, garantindo total isolamento das responsabilidades.

### 3.3. Unit of Work
* **Tipo:** Padrão de Gerenciamento de Transações (PoEAA)
* **Onde foi usado:** Gerenciado pelo `EntityManager` do JPA, atuando em conjunto com o `@Transactional`.
* **Justificativa Técnica:** O Unit of Work atua como um "acumulador". Ele monitora todas as modificações (inserções, atualizações, exclusões) feitas nas entidades durante uma transação de negócio. Em vez de fazer múltiplos acessos onerosos ao PostgreSQL, ele sincroniza todas as mudanças de uma só vez (no *flush*/*commit*), otimizando a performance e garantindo a integridade transacional (ACID).