FROM nginx
COPY dist/ /srv/snucse
COPY nginx-snucse.conf /etc/nginx/conf.d/snucse.conf
RUN rm /etc/nginx/conf.d/default.conf
