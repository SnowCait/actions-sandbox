FROM php:8.1.5-cli

ENV TZ Asia/Tokyo
RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD ./php.ini /usr/local/etc/php/php.ini
