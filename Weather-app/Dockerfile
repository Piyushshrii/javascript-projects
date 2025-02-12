FROM nginx:latest

WORKDIR /urs/share/nginx/html

RUN rm -rf ./*

COPY . .

EXPOSE 80

CMD ["nginx,","-g" "daemon off"]
