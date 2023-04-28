const amqp = require("amqplib");

(async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queueName = "queue01";
    await channel.assertQueue(queueName, { durable: false});

    const message = "hello from rabbitmq";

    channel.sendToQueue(queueName, Buffer.from(message));

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 4000);
})();