FROM node:20-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
RUN npm install --development
RUN npm run build
CMD [ "npm", "run", "dev" ]
