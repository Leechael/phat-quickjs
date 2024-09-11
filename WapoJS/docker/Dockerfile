# ARG ALPINE_VERSION=3.18.4
ARG ALPINE_VERSION=latest

FROM lipanski/docker-static-website as static-website
FROM ghcr.io/tursodatabase/libsql-server as sqld

FROM alpine:${ALPINE_VERSION}

RUN apk add --no-cache bash && adduser -D wapo
RUN mkdir -p /var/lib/sqld /var/lib/wapo-gateway && chown wapo:wapo /var/lib/sqld /var/lib/wapo-gateway

EXPOSE 8443
EXPOSE 80
EXPOSE 3000

# Copy from the sqld image
COPY --from=sqld /bin/sqld /bin/sqld
COPY --from=sqld /lib64/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2
COPY --from=sqld /lib/x86_64-linux-gnu /lib/x86_64-linux-gnu
# Copy from the static website image
COPY --from=static-website /busybox-httpd /bin/busybox-httpd
COPY --from=static-website /home/static/httpd.conf /etc/httpd.conf

COPY ./wapojs /bin/wapojs
COPY ./server.js /var/lib/wapo-gateway/server.js

COPY ./start.sh /start.sh

# Use our non-root user
USER wapo
WORKDIR /home/wapo

ENV WAPOJS_PUBLIC_SQLD_API="http://127.0.0.1:8080"
ENV WAPOJS_PUBLIC_FILE_URL="http://127.0.0.1:3000/index.js"
ENV WAPOJS_BIND="0.0.0.0:80"

CMD ["bash", "/start.sh"]
