# Documentação de Requisitos

## 1. Requisitos Funcionais (RF)

- **RF01 – Gestão de Pontos (CRUD):** O sistema deve permitir ao administrador cadastrar, consultar, atualizar e remover pontos de coleta.
- **RF02 – Visualização Geográfica:** O sistema deve exibir os pontos de coleta em um mapa interativo.
- **RF03 – Visualização em Lista:** O sistema deve exibir os pontos de coleta em formato de cards.
- **RF04 – Detalhamento de Ponto:** O sistema deve exibir informações detalhadas (horários, materiais aceitos, restrições) ao selecionar um ponto.
- **RF05 – Gestão de Categorias:** O sistema deve permitir ao administrador gerenciar as categorias de materiais (Pilhas, Baterias, TV, etc.).
- **RF06 – Registro de Feedback:** O sistema deve permitir que usuários anônimos enviem relatos sobre o status de um ponto (ex: cheio, não encontrado).
- **RF07 – Controle de Feedbacks:** O sistema deve permitir ao administrador listar e marcar feedbacks como "Resolvidos".
- **RF08 – Autenticação:** O sistema deve autenticar administradores para acesso às áreas restritas.
- **RF09 – Localização do Usuário:** O sistema deve identificar a posição atual do usuário (latitude/longitude) para plotá-la no mapa e calcular a distância até os pontos de coleta.

## 2. Requisitos Não Funcionais (RNF)

- **RNF01 – Segurança:** As senhas devem ser criptografadas com BCrypt e a comunicação protegida via JWT.
- **RNF02 – Integridade Geográfica:** Validação estrita de coordenadas (Lat: -90 a 90 | Long: -180 a 180).
- **RNF03 – Interface Web:** A aplicação deve ser compatível com os principais navegadores modernos (Chrome, Firefox, Edge).
- **RNF04 – Persistência:** Uso de banco de dados relacional PostgreSQL.
- **RNF05 – Performance do Mapa:** O carregamento dos pontos e da posição do usuário deve ser assíncrono para evitar o bloqueio da interface.
- **RNF06 – Precisão da Distância:** O cálculo de distância entre o usuário e os pontos deve utilizar a Fórmula de Haversine para garantir precisão em linha reta (esférica).
- **RNF07 – Privacidade (LGPD):** O sistema deve solicitar permissão explícita do navegador para acessar os dados de geolocalização do usuário.
- **RNF08 – Disponibilidade Offline do Mapa:** O sistema deve exibir uma mensagem amigável ou estado de erro caso as APIs de mapa não possam ser carregadas.

## 3. Matriz de Rastreabilidade (Requisitos vs. User Stories)

| ID | Requisito Funcional (RF) | User Story (US) Relacionada |
| :--- | :--- | :--- |
| **RF01** | Gestão de Pontos (CRUD) | [US02] Gestão de Pontos de Coleta |
| **RF02** | Visualização Geográfica (Mapa) | [US03] Visualização de Pontos (Mapa e Cards) |
| **RF03** | Visualização em Lista (Cards) | [US03] Visualização de Pontos (Mapa e Cards) |
| **RF04** | Detalhamento de Ponto | [US04] Detalhamento e Geolocalização |
| **RF05** | Gestão de Categorias | [US05] Gestão de Categorias e Feedbacks |
| **RF06** | Registro de Feedback (Cidadão) | [US06] Registro de Feedback de Campo |
| **RF07** | Controle de Feedbacks (Admin) | [US05] Gestão de Categorias e Feedbacks |
| **RF08** | Autenticação (Admin) | [US01] Autenticação e Segurança |
| **RF09** | Localização do Usuário (Distância) | [US04] Detalhamento e Geolocalização |
