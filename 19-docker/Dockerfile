# FROM node:22-alpine

# # create an /app dir and cd into it
# WORKDIR /app 

# COPY ./package*.json ./

# RUN npm i

# COPY ./ ./

# ENTRYPOINT [ "npm", "run", "dev" ]

FROM node:22-alpine AS builder

# create an /app dir and cd into it
WORKDIR /app 

COPY ./package*.json ./

RUN npm i

COPY ./ ./

RUN npm run build-docker

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /app/dist ./
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]


