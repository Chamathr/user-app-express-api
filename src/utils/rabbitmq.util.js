const amqp = require('amqplib');
const RabbitMQConfig = require('../config/rabbitmq.config')

const RabbitMQInstance = (() => {
    let channel = null;

    const connect = async () => {
        try {
            if (channel) {
                return channel;
            }

            const connection = await amqp.connect(RabbitMQConfig.rabbitmqUrl);
            channel = await connection.createChannel();

            await channel.assertQueue(RabbitMQConfig.emailServiceQueue);

            return channel;
        } catch (error) {
            throw new Error(`Error connecting to RabbitMQ: ${error}`);
        }
    };

    const disconnect = async () => {
        try {
            if (channel) {
                await channel.close();
                channel = null;
            }
        } catch (error) {
            throw new Error(`Error disconnecting from RabbitMQ: ${error}`);
        }
    };

    const sendToQueue = async (queueName, message) => {
        try {
            await channel.sendToQueue(queueName, Buffer.from(message));
        } catch (error) {
            throw new Error(`Error adding message to queue: ${error}`);
        }
    };

    return {
        connect,
        disconnect,
        sendToQueue,
    };
})();

module.exports = { RabbitMQInstance }