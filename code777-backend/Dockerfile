FROM node:20-alpine

WORKDIR /app

# package.json 먼저 복사 (캐시 활용)
COPY package*.json ./
RUN npm install --production

# 나머지 소스 복사
COPY . .

EXPOSE 4000

CMD ["node", "src/server.js"]