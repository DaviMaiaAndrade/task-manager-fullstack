# Backend - Task Manager API

API REST desenvolvida com NestJS, Prisma e PostgreSQL.

## Instalação
```bash
npm install
```

## Configuração

1. Configure o `.env`:
```env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/taskmanager?schema=public"
PORT=3000
```

2. Execute as migrations:
```bash
npx prisma migrate dev --name init
```

## Executar
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start
```

## Endpoints

- `GET /tasks` - Listar todas as tasks
- `POST /tasks` - Criar nova task

## Testar
```bash
npm test
```