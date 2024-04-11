FROM node:lts AS development

WORKDIR /app
RUN npm install -g @angular/cli@16.0.0

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check", "--poll", "1"]
