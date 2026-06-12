FROM nginx:alpine

COPY personal-website/ /usr/share/nginx/html/

EXPOSE 80
