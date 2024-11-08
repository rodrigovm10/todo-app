FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_REACT_API_URL_DEV
ENV VITE_REACT_API_URL_DEV=${VITE_REACT_API_URL_DEV}

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]