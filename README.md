# DEVELOPER.md

## Configuração e execução do serviço

Este documento explica como configurar e rodar o serviço localmente, bem como os passos para colocá-lo em produção.

---

## Pré-requisitos

- Node.js (versão 18+ recomendada)
- npm ou yarn
- PostgreSQL rodando localmente ou remotamente
- Git (para clonar o repositório)
- Terminal para rodar comandos

---

## 1. Clonando o projeto

```bash
git clone https://github.com/ricard027/sellit
cd sellit
```

## 2. Instalando dependências

```bash
npm install
# ou
yarn install

```

## 3. Configurando variáveis de ambiente

### Crie um arquivo .env na raiz do projeto com as variáveis necessárias:

```DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
API_DEV_URL=https://dummyjson.com/
NODE_ENV=development
```

## 4. Preparando o banco de dados

### Certifique-se que o PostgreSQL está rodando.

_Execute as migrations (se houver)_:

```bash
npm run migrate
# ou outro comando que você use para migrations

```

## 5. Executando a seed (opcional)

### Para popular dados de teste:

```bash
npm run db:seed
```

_O seed roda somente com NODE_ENV=development._

## 6. Rodando o serviço localmente

```bash
npm run dev

```

_O serviço estará disponível em: `http://localhost:3000` (ou a porta configurada)._
