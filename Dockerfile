FROM node:18 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

FROM nginx:1.23
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx-snucse.conf /etc/nginx/conf.d/snucse.conf
COPY --from=builder /app/dist/ /srv/snucse
