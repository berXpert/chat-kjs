# chat-kjs
Sample chat using Socket.IO backed by Kafka.

## Motivation
Usually Kafka clients require some sort of server side worker, for example when you need a certificate.

Having a kafka client listening on the server side and publishing to the Web clients using Socket.IO affectivelly provides a kafka client for a web app.

## Setup
Install Zookeeper/Kafka in your local environment (or connect to an existing)

### Start Zookeeper:
$ zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties

### Start Kafka server:
$ kafka-server-start /usr/local/etc/kafka/server.properties

### Install dependencies
node install

### Start the server
node index.js

Open 2 web browsers, go to localhost:3000
http://localhost:3000/

### Optionally run Kafka producer & consumer
$ kafka-console-consumer --bootstrap-server localhost:9092 --topic test-topic --from-beginning

$ kafka-console-producer --broker-list localhost:9092 --topic test-topic
