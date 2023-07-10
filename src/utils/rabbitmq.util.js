const amqp = require('amqplib');
const RabbitMQConfig = require('../config/rabbitmq.config')

const publishMessage = async (queue, message) => {
    try {
        const connection = await amqp.connect(RabbitMQConfig.rabbitmqUrl);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(message));

        await channel.close();
        await connection.close();
    } catch (error) {
        throw error
    }
}

module.exports = { publishMessage }
