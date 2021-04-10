FROM node:15.14.0-buster as builder

RUN npm config set unsafe-perm true

ARG VUE_APP_API_URL

ADD . code

RUN chown -R node code
RUN chmod -R 777 code

USER node

WORKDIR code

RUN npm install --legacy-peer-deps
RUN yarn build

FROM nginx:1.19.6

LABEL version = "1.0"
LABEL description = "Nginx docker container"
LABEL maintainer = "rinesh.ramadhin@gmail.com"

COPY --from=builder code/dist /usr/share/nginx/html
COPY compose/nginx/nginx.conf /etc/nginx/conf.d/default.conf
