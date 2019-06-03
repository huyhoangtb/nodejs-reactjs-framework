// // cd $server & run "npm run worker"
// import jobTypes from './jobs/types';
// import updateExchangeRate from './jobs/exchangeRate';
// import { create, list, view, listAddr } from './jobs/wallet';
//
// var amqp = require('amqplib/callback_api');
//
// var consumeJobs = function(ch:any, q:any) {
//     ch.consume(q, function(msg:any) {
//         var job = JSON.parse(msg.content);
//         // console.log('Job Consumer', job);
//         if (job.type === jobTypes.createUserWallets) {
//           // list();
//           // view('primary');
//           // view('123');
//           // console.log('view primary', view('primary'));
//           // console.log('view 123', view('123'));
//           console.log("Now create createUserWallets for ", job.payload);
//           listAddr('primary');
//           // create(job.payload);
//         }
//         // socket.broadcast.emit("SET_EXCHANGE_RATE", {
//         //     setResult: content,
//         //     success: true
//         // });
//         // console.log(" [x] Received %s", msg.content.toString());
//     }, {noAck: true});
// };
//
// amqp.connect('amqp://localhost', function(err, conn) {
//   conn.createChannel(function(err, ch) {
//     // updateExchangeRate(ch);
//     consumeJobs(ch, 'job');
//   });
// });
