# ✅ Task Manager - Aplicação Full Stack

Aplicação completa de gerenciamento de tarefas desenvolvida com **NestJS**, **React**, **TypeScript** e **PostgreSQL**.

## 📋 Sobre o Projeto

Sistema para criar e listar tarefas (tasks) com três status diferentes:
- 📋 **To Do** - Tarefas a fazer
- ⚡ **Doing** - Tarefas em andamento  
- ✅ **Done** - Tarefas concluídas

### 🎯 Objetivo

Teste técnico para vaga de Desenvolvedor Full Stack Pleno, demonstrando conhecimentos em:
- Arquitetura de aplicações modernas
- Desenvolvimento de APIs RESTful
- Integração Frontend ↔ Backend
- Validação de dados
- Organização e boas práticas de código

---

## 🚀 Tecnologias Utilizadas

### Backend
- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de DTOs

### Frontend
- **[React](https://react.dev/)** - Biblioteca para interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool rápido
- **[Axios](https://axios-http.com/)** - Cliente HTTP

---

## 📁 Estrutura do Projeto
```
task-manager/
├── backend/                    # API NestJS
│   ├── prisma/
│   │   └── schema.prisma      # Schema do banco de dados
│   ├── src/
│   │   ├── tasks/
│   │   │   ├── dto/
│   │   │   │   └── create-task.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── task.entity.ts
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── tasks.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # Aplicação React
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.tsx
    │   │   └── TaskList.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── types/
    │   │   └── task.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── tsconfig.json
```

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[PostgreSQL](https://www.postgresql.org/download/)** (versão 14 ou superior)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)**

---

## 🔧 Instalação e Configuração

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/SEU_USUARIO/task-manager.git
cd task-manager
```

### 2️⃣ Configurar o Backend
```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Edite o arquivo .env e configure a URL do PostgreSQL:
# DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/taskmanager?schema=public"

# Executar migrations do Prisma (cria o banco e tabelas)
npx prisma migrate dev --name init

# Gerar Prisma Client
npx prisma generate
```

### 3️⃣ Configurar o Frontend
```bash
# Voltar para a raiz e entrar no frontend
cd ../frontend

# Instalar dependências
npm install
```

---

## 🚀 Como Executar

### Backend (Terminal 1)
```bash
cd backend
npm run start:dev
```

O servidor estará rodando em: **http://localhost:3000**

### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

---

## 📡 Endpoints da API

### **GET /tasks**
Retorna todas as tasks ordenadas por data de criação (mais recente primeiro).

**Resposta:**
```json
[
  {
    "id": "uuid",
    "title": "Minha task",
    "description": "Descrição da task",
    "status": "to-do",
    "createdAt": "2024-11-27T20:00:00.000Z",
    "updatedAt": "2024-11-27T20:00:00.000Z"
  }
]
```

### **POST /tasks**
Cria uma nova task.

**Body:**
```json
{
  "title": "Título da task",
  "description": "Descrição opcional",
  "status": "to-do"
}
```

**Validações:**
- `title` - String obrigatória
- `description` - String opcional
- `status` - Deve ser: `"to-do"`, `"doing"` ou `"done"`

**Resposta:**
```json
{
  "id": "uuid-gerado",
  "title": "Título da task",
  "description": "Descrição opcional",
  "status": "to-do",
  "createdAt": "2024-11-27T20:00:00.000Z",
  "updatedAt": "2024-11-27T20:00:00.000Z"
}
```

---

## 🎨 Funcionalidades

### ✅ Implementadas

- [x] Criar nova task com validação
- [x] Listar todas as tasks
- [x] Validação de campos obrigatórios
- [x] Validação de status permitidos
- [x] Feedback visual de carregamento
- [x] Interface responsiva
- [x] Tratamento de erros
- [x] CORS configurado
- [x] Tipagem TypeScript completa

### 🔮 Melhorias Futuras (Não obrigatórias)

- [ ] Editar tasks existentes
- [ ] Deletar tasks
- [ ] Filtrar tasks por status
- [ ] Buscar tasks por título
- [ ] Paginação
- [ ] Testes unitários (Jest)
- [ ] Testes E2E
- [ ] Deploy (Vercel + Railway)
- [ ] Docker Compose

---

## 🧪 Testando a Aplicação

### Usando o Navegador

1. Acesse http://localhost:5173
2. Preencha o formulário
3. Clique em "Criar Task"
4. Veja a task aparecer na lista

### Usando Postman/Insomnia

**Criar Task:**
```bash
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Testar API",
  "description": "Testando com Postman",
  "status": "doing"
}
```

**Listar Tasks:**
```bash
GET http://localhost:3000/tasks
```

### Usando Prisma Studio
```bash
cd backend
npx prisma studio
```

Abre interface visual em http://localhost:5555

---

## 🗄️ Banco de Dados

### Schema
```sql
CREATE TABLE tasks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  status      VARCHAR(50) NOT NULL DEFAULT 'to-do',
  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Comandos Úteis do Prisma
```bash
# Criar migration
npx prisma migrate dev --name nome_da_migration

# Resetar banco de dados
npx prisma migrate reset

# Ver banco de dados
npx prisma studio

# Gerar Prisma Client
npx prisma generate
```

---

## 🏗️ Arquitetura

### Backend (NestJS)
```
main.ts → Inicia servidor + configura CORS e validação
  ↓
AppModule → Módulo raiz
  ↓
TasksModule → Módulo de tasks
  ├─ TasksController → Rotas HTTP (GET, POST)
  ├─ TasksService → Lógica de negócio
  ├─ CreateTaskDto → Validação de entrada
  └─ Task Entity → Modelo de dados
  ↓
Prisma → ORM
  ↓
PostgreSQL → Banco de dados
```

### Frontend (React)
```
main.tsx → Renderiza App
  ↓
App.tsx → Componente principal
  ├─ TaskForm → Formulário de criação
  ├─ TaskList → Lista de tasks
  └─ api.ts → Cliente HTTP (Axios)
  ↓
Backend API → http://localhost:3000
```

---

## 🔐 Variáveis de Ambiente

### Backend (.env)
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/taskmanager?schema=public"
PORT=3000
```

---

## 📝 Scripts Disponíveis

### Backend
```bash
npm run start:dev    # Modo desenvolvimento (watch mode)
npm run build        # Build para produção
npm run start        # Executar build de produção
```

### Frontend
```bash
npm run dev          # Modo desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
```

---

## 🐛 Troubleshooting

### Backend não inicia

**Erro:** "Can't reach database server"

**Solução:**
1. Verifique se o PostgreSQL está rodando
2. Confirme as credenciais no `.env`
3. Teste a conexão: `npx prisma studio`

### CORS Error no Frontend

**Erro:** "Access blocked by CORS policy"

**Solução:**
Verifique se o backend tem:
```typescript
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

### Erro ao criar task

**Erro:** Validation failed

**Solução:**
Verifique se está enviando:
- `title` (obrigatório)
- `status` com valores válidos: `to-do`, `doing` ou `done`

---

## 👨‍💻 Autor

**Davi**
- Desenvolvedor Full Stack
- LinkedIn: [https://www.linkedin.com/in/davimaiaandrade/]

---

## 📄 Licença

Este projeto foi desenvolvido como teste técnico para processo seletivo.

---

## 🙏 Agradecimentos

Agradeço pela oportunidade de participar deste processo seletivo e demonstrar minhas habilidades técnicas.
