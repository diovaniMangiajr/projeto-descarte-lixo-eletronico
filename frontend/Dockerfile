# Estágio 1: Build do projeto React (Vite)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servidor Web (Nginx)
FROM nginx:alpine
# Copia a pasta 'dist' (padrão do Vite) para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copia a configuração do Nginx para evitar erro 404 em rotas do React
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
