FROM nginx:alpine

COPY todo-app/ /usr/share/nginx/html/

EXPOSE 80
