FROM node:latest
# EXPOSE 3004

COPY . .

RUN npm install

# RUN mkdir -p /app/config /app/src
WORKDIR /app

# COPY package.json ./package.json
# COPY package-lock.json ./package-lock.json


# CMD [ "nodemon", "src/server.js" ]
CMD [ "npm", "start" ]