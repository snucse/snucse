FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx-snucse.conf /etc/nginx/conf.d/snucse.conf
COPY dist/ /srv/snucse
