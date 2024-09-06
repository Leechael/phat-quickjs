ARG ALPINE_VERSION=3.18.4

FROM alpine:${ALPINE_VERSION} AS builder
# FROM alpine:${ALPINE_VERSION}

# RUN wget https://github.com/tursodatabase/libsql/releases/download/libsql-server-v0.24.23/libsql-server-x86_64-unknown-linux-gnu.tar.xz \
#     && tar -xvf libsql-server-x86_64-unknown-linux-gnu.tar.xz
# RUN apk add --no-cache bash

RUN adduser -D static

FROM scratch

EXPOSE 8443

# Copy over the user
COPY --from=builder /etc/passwd /etc/passwd
# COPY --from=builder /libsql-server-x86_64-unknown-linux-gnu/libsqld /libsqld

COPY ./wapojs /wapojs
COPY ./server.js /server.js
# COPY ./sqld /sqld
# COPY ./start.sh /start.sh

# Use our non-root user
USER static
WORKDIR /home/static

ENV WAPOJS_PUBLIC_CERT="LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUJaekNDQVEyZ0F3SUJBZ0lJYkVMSEZUemtmSEF3Q2dZSUtvWkl6ajBFQXdJd0lURWZNQjBHQTFVRUF3d1cKY21OblpXNGdjMlZzWmlCemFXZHVaV1FnWTJWeWREQWdGdzAzTlRBeE1ERXdNREF3TURCYUdBODBNRGsyTURFdwpNVEF3TURBd01Gb3dJVEVmTUIwR0ExVUVBd3dXY21OblpXNGdjMlZzWmlCemFXZHVaV1FnWTJWeWREQlpNQk1HCkJ5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSEEwSUFCT29SemRFYWdGRFpmL2ltNzlaNUpVeWVYUDk2WXd3Nm5IOFgKUk92WE9FU25FMHlGdGxWamRqME5UTlhUMm0rUFd6dXhzanZQVkJXUi90cERsZGpUVzhDakxUQXJNQ2tHQTFVZApFUVFpTUNDQ0UyaGxiR3h2TG5kdmNteGtMbVY0WVcxd2JHV0NDV3h2WTJGc2FHOXpkREFLQmdncWhrak9QUVFECkFnTklBREJGQWlFQXN1WktzZGtzUHNybkpGZFY5SlRaMVA3ODJJbHFqcU5MOWFBVVJ2ckYzVWtDSUREcFR2RTUKRXlaNXpSZmxuQitad29talhOaFRBbmFzUmpRVERxWEZyUWJQCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K"
ENV WAPOJS_PUBLIC_KEY="LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JR0hBZ0VBTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSEJHMHdhd0lCQVFRZ0gxVmxWWC8zREkzN1VSNWcKdEd6VU9TQWFPbWpRYlpNSlEyWjllQm56aDMraFJBTkNBQVRxRWMzUkdvQlEyWC80cHUvV2VTVk1ubHovZW1NTQpPcHgvRjBUcjF6aEVweE5NaGJaVlkzWTlEVXpWMDlwdmoxczdzYkk3ejFRVmtmN2FRNVhZMDF2QQotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0t"
ENV WAPOJS_PUBLIC_SERVER_NAME="wapo-gateway"
# ENV WAPOJS_PUBLIC_SQLD_API="http://127.0.0.1:8080"

# Run busybox httpd
#CMD ["/busybox-httpd", "-f", "-v", "-p", "3000", "-c", "httpd.conf"]
CMD ["/wapojs", "--worker-secret", "testnet", "--tls-port", "8443", "/server.js"]
# CMD ["bash", "/start.sh"]
