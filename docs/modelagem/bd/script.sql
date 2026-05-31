-- 1. Tabela de Roles
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    entity_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP,
    nome VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT ck_roles_entity_status
        CHECK (entity_status IN ('ACTIVE', 'INACTIVE', 'DELETED')),
    CONSTRAINT ck_roles_nome
        CHECK (nome IN ('ADMIN'))
);

-- 2. Tabela de Usuarios Admin
CREATE TABLE IF NOT EXISTS usuarios_admin (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    entity_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    CONSTRAINT ck_usuarios_admin_entity_status
        CHECK (entity_status IN ('ACTIVE', 'INACTIVE', 'DELETED'))
);

-- 3. Relacionamento Muitos-para-Muitos: Usuarios e suas Roles
CREATE TABLE IF NOT EXISTS usuario_possui_role (
    usuario_id UUID REFERENCES usuarios_admin(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, role_id)
);

-- 4. Tabela de Tipos de Produto
CREATE TABLE IF NOT EXISTS tipo_produto (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    entity_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP,
    nome VARCHAR(100) NOT NULL,
    descricao_exemplos VARCHAR(500) NOT NULL,
    CONSTRAINT ck_tipo_produto_entity_status
        CHECK (entity_status IN ('ACTIVE', 'INACTIVE', 'DELETED'))
);

-- 5. Tabela de Pontos de Coleta
CREATE TABLE IF NOT EXISTS ponto_coleta (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    entity_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP,
    nome VARCHAR(150) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    horario_abertura TIME NOT NULL,  
    horario_fechamento TIME NOT NULL, 
    CONSTRAINT ck_ponto_coleta_entity_status
        CHECK (entity_status IN ('ACTIVE', 'INACTIVE', 'DELETED')),
    CONSTRAINT ck_ponto_coleta_latitude
        CHECK (latitude >= -90 AND latitude <= 90),
    CONSTRAINT ck_ponto_coleta_longitude
        CHECK (longitude >= -180 AND longitude <= 180)
);

-- 6. Tabela de Relatos de Problema
CREATE TABLE IF NOT EXISTS relato_problema (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    entity_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP,
    ponto_coleta_id UUID NOT NULL,
    tipo_relato VARCHAR(50) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    observacao VARCHAR(1000),
    CONSTRAINT ck_relato_problema_entity_status
        CHECK (entity_status IN ('ACTIVE', 'INACTIVE', 'DELETED')),
    CONSTRAINT ck_relato_problema_tipo_relato
        CHECK (tipo_relato IN (
            'PONTO_NAO_EXISTE',
            'LIXEIRA_DANIFICADA',
            'LIXEIRA_CHEIA',
            'HORARIO_INCORRETO',
            'MATERIAIS_RECUSADOS',
            'OUTRO'
        )),
    CONSTRAINT fk_relato_problema_ponto_coleta
        FOREIGN KEY (ponto_coleta_id) REFERENCES ponto_coleta (id) ON DELETE CASCADE
);

-- 7. Tabela de Notificacoees
CREATE TABLE IF NOT EXISTS notificacao (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    entity_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP,
    titulo VARCHAR(150) NOT NULL,
    mensagem VARCHAR(500) NOT NULL,
    ponto_coleta_id UUID NOT NULL,
    relato_problema_id UUID NOT NULL,
    CONSTRAINT ck_notificacao_entity_status
        CHECK (entity_status IN ('ACTIVE', 'INACTIVE', 'DELETED')),
    CONSTRAINT fk_notificacao_ponto_coleta
        FOREIGN KEY (ponto_coleta_id) REFERENCES ponto_coleta (id) ON DELETE CASCADE,
    CONSTRAINT fk_notificacao_relato_problema
        FOREIGN KEY (relato_problema_id) REFERENCES relato_problema (id) ON DELETE CASCADE
);

-- 8. Relacionamento Muitos-para-Muitos: Ponto aceita Tipos de Produtos
CREATE TABLE IF NOT EXISTS ponto_aceita_tipo_produto (
    ponto_id UUID REFERENCES ponto_coleta(id) ON DELETE CASCADE,
    tipo_produto_id UUID REFERENCES tipo_produto(id) ON DELETE CASCADE,
    PRIMARY KEY (ponto_id, tipo_produto_id)
);