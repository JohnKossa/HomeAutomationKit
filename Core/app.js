/**
 * Created by kosine on 4/24/16.
 */
/*
* Will contain connection information for mongodb and rabbit.
* Will contain and the ability to process arbitrary "rules" specified in mongodb.
*
* Signals and Replies will be sent on their respective RabbitMQ channels.
* MongoDB will contain a section of "rules" that define behaviors specified by the user.
* MongoDB will also contain a section of "facts" about the current state of the universe
*   This will consist of the last known state of different devices as well as custom combinations set by the core
* Signals will be processed by core and run against the Rules and Facts to produce Replies
*/

/*
* Connect to MongoDB, Connect to Rabbit, Pull rules, begin processing queues
*/
var db = require('./MongoDB_Core');

var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {});
	var q = 'hello';

	ch.assertQueue(q, {durable: false});
	// Note: on Node 6 Buffer.from(msg) should be used
	ch.sendToQueue(q, new Buffer('Hello World!'));
	ch.consume(q, function(msg) {
		console.log(" [x] Received %s", msg.content.toString());
	}, {noAck: true});
	console.log(" [x] Sent 'Hello World!'");
	setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
