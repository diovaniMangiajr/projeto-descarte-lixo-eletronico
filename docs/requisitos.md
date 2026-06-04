# Documentação de Requisitos

## 1. Requisitos Funcionais (RF)

- **RF01 – Gestão de Pontos (CRUD):** O sistema deve permitir ao administrador cadastrar, consultar, atualizar e remover pontos de coleta.
- **RF02 – Visualização Geográfica:** O sistema deve exibir os pontos de coleta em um mapa interativo.
- **RF03 – Visualização em Lista:** O sistema deve exibir os pontos de coleta em formato de cards.
- **RF04 – Detalhamento de Ponto:** O sistema deve exibir informações detalhadas (horários, materiais aceitos, restrições) ao selecionar um ponto.
- **RF05 – Gestão de Tipos de Produtos:** O sistema deve permitir ao administrador gerenciar os tipos de produtos/materiais aceitos (Pilhas, Baterias, TV, etc.).
- **RF06 – Registro de Relatos de Problema:** O sistema deve permitir que usuários cidadãos informem nome, e-mail e enviem relatos do estado das lixeiras (ex: cheio, não encontrado).
- **RF07 – Controle de Relatos de Problema:** O sistema deve permitir ao administrador listar e marcar relatos de problemas como "Resolvidos".
- **RF08 – Autenticação:** O sistema deve autenticar administradores para acesso às áreas restritas.
- **RF09 – Localização do Usuário:** O sistema deve identificar a posição atual do usuário (latitude/longitude) para plotá-la no mapa e calcular a distância até os pontos de coleta.
- **RF10 – Notificação de Ocorrências (Admin):** O sistema deve gerar e exibir uma notificação interna no painel administrativo sempre que um novo relato de problema for enviado por um cidadão, permitindo que o administrador identifique instantaneamente quais pontos de coleta necessitam de atenção ou manutenção.

## 2. Requisitos Não Funcionais (RNF)

- **RNF01 – Segurança:** As senhas devem ser criptografadas com BCrypt e a comunicação protegida via JWT.
- **RNF02 – Integridade Geográfica:** Validação estrita de coordenadas (Lat: -90 a 90 | Long: -180 a 180).
- **RNF03 – Interface Web:** A aplicação deve ser compatível com os principais navegadores modernos (Chrome, Firefox, Edge).
- **RNF04 – Persistência:** Uso de banco de dados relacional PostgreSQL.
- **RNF05 – Performance do Mapa:** O carregamento dos pontos e da posição do usuário deve ser assíncrono para evitar o bloqueio da interface.
- **RNF06 – Precisão da Distância:** O cálculo de distância entre o usuário e os pontos deve utilizar a Fórmula de Haversine para garantir precisão em linha reta (esférica).
- **RNF07 – Privacidade (LGPD):** O sistema deve solicitar permissão explícita do navegador para acessar os dados de geolocalização do usuário. A coleta de nome e e-mail serve unicamente para o controle interno de relatos e contato dos administradores, garantindo a transparência com o usuário.
- **RNF08 – Disponibilidade Offline do Mapa:** O sistema deve exibir uma mensagem amigável ou estado de erro caso as APIs de mapa não possam ser carregadas.

## 3. Matriz de Rastreabilidade (Requisitos vs. User Stories)

| ID | Requisito Funcional (RF) | User Story (US) Relacionada |
| :--- | :--- | :--- |
| **RF01** | Gestão de Pontos (CRUD) | [US02] |
| **RF02** | Visualização Geográfica (Mapa) | [US03] |
| **RF03** | Visualização em Lista (Cards) | [US03] |
| **RF04** | Detalhamento de Ponto | [US04] |
| **RF05** | Gestão de Tipos de Produtos | [US05] |
| **RF06** | Registro de Relatos de Problema (Cidadão) | [US06] |
| **RF07** | Controle de Relatos de Problema (Admin) | [US05] |
| **RF08** | Autenticação (Admin) | [US01] |
| **RF09** | Localização do Usuário (Distância) | [US04] |
| **RF10** | Notificação de Ocorrências (Admin) | [US05] |
