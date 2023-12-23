FROM node:18-slim

WORKDIR /app

ENV DB_HOST=sql
ENV DB_USER=root
ENV DB_PASSWORD=satyamPAL123
ENV DB_NAME=user
ENV DB_CONNECTION_LIMIT=20

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]

