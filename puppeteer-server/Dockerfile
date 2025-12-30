FROM ghcr.io/puppeteer/puppeteer:21.6.1

WORKDIR /app

COPY package.json ./

RUN npm install --omit=dev

COPY index.js ./

EXPOSE 3001

CMD ["node", "index.js"]
