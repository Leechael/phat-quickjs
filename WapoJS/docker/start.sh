#!/bin/bash

PROCESS1="/bin/busybox-httpd -f -v -p 3000 -c /etc/httpd.conf"
PROCESS2="/bin/sqld --http-listen-addr 0.0.0.0:8080 --db-path /var/lib/sqld"
PROCESS3="/bin/wapojs --worker-secret testnet /var/lib/wapo-gateway/server.js"

stop_all() {
    echo "Stopping all processes..."
    kill ${pid1} ${pid2} ${pid3} 2>/dev/null
}

trap stop_all SIGTERM SIGINT SIGQUIT

$PROCESS1 &
pid1=$!
$PROCESS2 &
pid2=$!
$PROCESS3 &
pid3=$!

sleep 1 && wget -o /dev/null http://127.0.0.1/migrate

wait -n

stop_all

wait

