FROM node:15.14.0-buster as builder

# Setup environment arguments
ARG VUE_APP_API_URL
ARG VUE_APP_SENTRY_DSN

# Configure NPM
RUN npm config set unsafe-perm true

# Install packages
USER node
WORKDIR code
ADD package.json .
ADD yarn.lock .
RUN yarn install

# Add source code
ADD . .
USER root
RUN chown -R node .
RUN chmod -R 777 .

# Build for production
USER node
RUN yarn build

FROM nginx:1.19.6

# Setup labels
LABEL version = "1.0"
LABEL description = "Nginx docker container"
LABEL maintainer = "rinesh.ramadhin@gmail.com"

# Copy files
COPY --from=builder code/dist /usr/share/nginx/html
COPY compose/nginx/nginx.conf /etc/nginx/conf.d/default.conf
