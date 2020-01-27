FROM alpine:latest as builder

WORKDIR /app

RUN apk upgrade --update --no-cache && \
    apk add --no-cache \
        nodejs \
        yarn

ADD . .

RUN yarn install

CMD [ "yarn", "start" ]
