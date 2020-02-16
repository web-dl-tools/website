FROM node:13.8.0-stretch as builder

RUN npm config set unsafe-perm true

ARG VUE_APP_API_URL

ADD . code

RUN chown -R node code
RUN chmod -R 777 code

USER node

WORKDIR code

RUN yarn install
RUN yarn build

FROM nginx:1.17.8

LABEL version = "0.1"
LABEL description = "Nginx docker container"
LABEL maintainer = "rinesh.ramadhin@gmail.com"

COPY --from=builder code/dist /usr/share/nginx/html
COPY compose/nginx/nginx.conf /etc/nginx/conf.d/default.conf
