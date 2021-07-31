FROM php:8.0.7-cli

ENV TZ Asia/Tokyo
RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ADD ./php.ini /usr/local/etc/php/php.ini
