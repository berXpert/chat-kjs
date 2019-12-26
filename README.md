# chat-kjs
Sample chat using Socket.IO backed by Kafka.

## Motivation
Usually Kafka clients require some sort of server side worker, for example when you need a certificate.

Having a kafka client listening on the server side and publishing to the Web clients using Socket.IO affectivelly provides a kafka client for a web app.
