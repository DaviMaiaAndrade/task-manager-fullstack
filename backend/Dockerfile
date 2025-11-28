# ==================================
# Stage 1: Build
# ==================================
FROM node:18-alpine AS builder

# Instalar dependências necessárias para o Prisma
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

# Instalar dependências (incluindo devDependencies)
RUN npm install

# Copiar código fonte
COPY src ./src

# Gerar Prisma Client
RUN npx prisma generate

# Build com TypeScript Compiler direto
RUN npx tsc -p tsconfig.build.json

# ==================================
# Stage 2: Production
# ==================================
FROM node:18-alpine AS production

# Instalar OpenSSL para produção
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copiar package.json
COPY package*.json ./
COPY prisma ./prisma/

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Gerar Prisma Client em produção
RUN npx prisma generate

# Copiar arquivos buildados
COPY --from=builder /app/dist ./dist

# Expor porta
EXPOSE 3000

# Comando para rodar
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]