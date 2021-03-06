var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: [], user: {}, count: 0 })
  .write()


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});



const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9092']
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })

  // Consuming Kafka
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });

      io.emit('chat message', message.value.toString());
    },
  })
}

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    // io.emit('chat message', msg); let's use  Kafka consumer 'emit' the received message

    producer.send({
      topic: 'test-topic',
      messages: [
        { value: msg },
      ],
    })

    // Add a post
    db.get('posts')
      .push({ id: 1, message: msg })
      .write()
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});

run().catch(console.error)