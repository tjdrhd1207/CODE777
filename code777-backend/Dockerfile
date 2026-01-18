FROM node:20-alpine

WORKDIR /app

COPY code777-backend/package*.json ./
RUN npm install --production

COPY code777-backend/ .

ENV PORT=4000
EXPOSE 4000

CMD ["node", "src/server.js"]