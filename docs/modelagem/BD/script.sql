-- 1. Tabela de adm 
CREATE TABLE usuarios_admin (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de categorias 
CREATE TABLE categorias_residuo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL,
    descricao VARCHAR(200),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de pontos de coleta 
CREATE TABLE pontos_coleta (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    itens_nao_aceitos TEXT, 
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(150) NOT NULL,
    numero VARCHAR(20),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) DEFAULT 'Lavras' NOT NULL,
    uf VARCHAR(2) DEFAULT 'MG' NOT NULL,
    latitude DECIMAL(10, 8),  
    longitude DECIMAL(11, 8), 
    horario_funcionamento VARCHAR(150),
    ativo BOOLEAN DEFAULT TRUE,
    criado_por INT REFERENCES usuarios_admin(id),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de relacionamento 
CREATE TABLE ponto_aceita_categoria (
    ponto_id INT REFERENCES pontos_coleta(id) ON DELETE CASCADE,
    categoria_id INT REFERENCES categorias_residuo(id) ON DELETE CASCADE,
    PRIMARY KEY (ponto_id, categoria_id)
);

-- 5. Tabela de feedback do cidadao 
CREATE TABLE feedbacks_cidadao (
    id SERIAL PRIMARY KEY,
    ponto_id INT REFERENCES pontos_coleta(id) ON DELETE CASCADE,
    tipo_problema VARCHAR(50) NOT NULL, 
    comentario_livre TEXT,              
    resolvido BOOLEAN DEFAULT FALSE,    
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


