FROM node:18.7.0-buster as builder

RUN npm config set unsafe-perm true

ARG VUE_APP_API_URL
ARG VUE_APP_SENTRY_DSN

ADD . code

RUN chown -R node code
RUN chmod -R 777 code

USER node

WORKDIR code

RUN yarn install
RUN yarn build

FROM nginx:1.23.1

ARG VUE_APP_API_URL

LABEL version = "1.0"
LABEL description = "Nginx docker container"
LABEL maintainer = "Rinesh Ramadhin"

COPY --from=builder code/dist /usr/share/nginx/html
COPY compose/nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN sed -i -e 's+{VUE_APP_API_URL}+'"$VUE_APP_API_URL"'+' /etc/nginx/conf.d/default.conf
RUN sed -i -e 's+localhost:+host.docker.internal:+' /etc/nginx/conf.d/default.conf
