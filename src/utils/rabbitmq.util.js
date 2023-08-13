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
            await channel.assertQueue(RabbitMQConfig.elasticsearchServiceQueue);

            console.log("Connected RabbitMQ")
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
                console.log("Disconnected RabbitMQ")
            }
        } catch (error) {
            throw new Error(`Error disconnecting from RabbitMQ: ${error}`);
        }
    };

    const addToQueue = async (queueName, message) => {
        try {
            await channel.sendToQueue(queueName, Buffer.from(message));
        } catch (error) {
            throw new Error(`Error adding message to queue: ${error}`);
        }
    };

    return {
        connect,
        disconnect,
        addToQueue,
    };
})();

module.exports = { RabbitMQInstance }