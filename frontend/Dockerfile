# ==================================
# Stage 1: Build
# ==================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Definir variável de ambiente para build
ENV VITE_API_URL=http://localhost:3001

# Build da aplicação (gera pasta dist/)
RUN npm run build

# ==================================
# Stage 2: Production (Nginx)
# ==================================
FROM nginx:alpine AS production

# Copiar build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

# Nginx roda automaticamente
CMD ["nginx", "-g", "daemon off;"]