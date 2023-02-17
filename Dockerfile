FROM node:lts-alpine as build
COPY . /app
WORKDIR /app
ARG PUBLIC_PATH=/
RUN npm i && npm run build

FROM nginx:alpine
ARG PUBLIC_PATH=/
COPY scripts/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html${PUBLIC_PATH}
RUN sed -i 's@${PUBLIC_PATH}@'${PUBLIC_PATH}'@g' /etc/nginx/conf.d/default.conf
EXPOSE 80
