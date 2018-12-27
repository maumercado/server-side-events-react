FROM node:lts

RUN mkdir -p /app/client

WORKDIR /app

ADD . .
ENV SKIP_PREFLIGHT_CHECK=true

RUN npm run install-all

EXPOSE 4000

CMD ["npm","run","server"]