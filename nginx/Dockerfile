FROM debian:bullseye

RUN apt -y update &&\
	apt -y upgrade && \
	apt -y install nginx &&\
	apt -y install systemctl &&\
	apt -y install openssl &&\
	apt clean

WORKDIR /etc/nginx
COPY	conf/nginx.conf /etc/nginx/nginx.conf
COPY	tools/create_certificates.sh .
RUN		chmod +x create_certificates.sh &&\
		./create_certificates.sh

RUN	mkdir -p /var/run/nginx &&\
	chmod -R 755 /var/www/html &&\
	chown -R www-data:www-data /var/www/html

COPY js_app/* /var/www/html

EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
