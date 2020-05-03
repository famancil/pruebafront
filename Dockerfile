FROM node:13.2.0-alpine as build-step
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit
COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine as prod-stage

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-step /app/dist/frontend /usr/share/nginx/html                          

COPY dev/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
          envsubst '\$BACKEND_API_URL ' < \${mainFileName} > main.tmp && \
          mv main.tmp \${mainFileName} && nginx -g 'daemon off;'" > run.sh

ENTRYPOINT ["sh", "run.sh"]

# Set TimeZone
RUN apk add --no-cache tzdata
ENV TZ America/Santiago
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

