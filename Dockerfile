FROM node:14.19.1-alpine as base
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

ENV TZ="Asia/Shanghai"
RUN apk update && \
    apk add tzdata && \
    apk add --no-cache make jq python3 py3-pip
RUN echo "Asia/shanghai" > /etc/timezone
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

WORKDIR /app
COPY . .

WORKDIR /app
RUN yarn install
RUN yarn build


EXPOSE 1337
CMD ["yarn", "start"]