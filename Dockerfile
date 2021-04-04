FROM node:10-alpine as base
ENV NODE_ENV=production

EXPOSE 80

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production \
    && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

FROM base as dev
ENV NODE_ENV=development
ENV JWT_SECRET=asdfwefwefwef
ENV mongoDB=mongodb://mongo:27017/shoping-list
RUN npm install --only=development
CMD ["/app/node_modules/.bin/nodemon"]

FROM dev as build
COPY . .
RUN tsc

FROM base as prod
COPY --from=build /app/dist/ .
CMD ["node", "src/index.js"]