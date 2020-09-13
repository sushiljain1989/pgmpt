FROM node:10.22.0
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "./src/backend/index.js"]
