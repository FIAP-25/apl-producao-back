FROM node:18.17.1

WORKDIR /app

ENV NODE_ENV 'development' 
ENV PORT 5000 

ENV DATABASE_HOST 'mongo_producao' 
ENV DATABASE_PORT 27018 
ENV DATABASE_USERNAME 'root' 
ENV DATABASE_PASSWORD 'example' 
ENV DATABASE_SCHEMA 'fiap'
ENV DATABASE_AUTHSOURCE 'admin'

ENV URL_BASE 'http://node_pedido:3000/api/'

COPY package.json package-lock.json ./

COPY . .

RUN npm install --legacy-peer-deps --no-package-lock && npm run build

CMD npm run start:prod