# ==================================
# Stage 1: Build
# ==================================
FROM node:18-alpine AS builder

# Instalar dependências necessárias para o Prisma
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# ==================================
# Stage 2: Production
# ==================================
FROM node:18-alpine AS production

# Instalar OpenSSL para produção também
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copiar apenas o necessário para produção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Expor porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]