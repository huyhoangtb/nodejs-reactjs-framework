'user strict';

var amqp;
export default class RabbitService {
  // payload Json
  static sendToQueue(payload, q = 'job') {
    amqp = require('amqplib/callback_api');
    console.log('RabbitService');
    amqp.connect('amqp://localhost', function(err, conn) {
      conn.createChannel(function(err, ch) {
        ch.assertQueue(q, {durable: false});
        ch.sendToQueue(q, new Buffer(JSON.stringify(payload)));
        console.log(" [x] Updated xchange rate ");
      }, 1000);
    });
  }
}