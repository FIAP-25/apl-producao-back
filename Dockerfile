FROM node:18.17.1

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm install --legacy-peer-deps --no-package-lock && npm run build

CMD npm run start:prod