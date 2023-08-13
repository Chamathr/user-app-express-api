const RedisConfig = require('../config/redis.config')
const redis = require('redis');

const RedisInstance = (() => {
    
    const redisHost = RedisConfig?.REDIS_HOST
    const redisPort = RedisConfig?.REDIS_PORT
    const redisPassword = RedisConfig?.REDIS_PASSWORD

    let client = null;

    const connect = async () => {
        try {
            if (client) {
                return client;
            }

            client = redis.createClient({
                host: redisHost,
                port: redisPort,
                password: redisPassword
            });

            await client.connect();

            console.log("Connected Redis")
            
            return client;
        } catch (error) {
            throw new Error(`Error connecting to RabbitMQ: ${error}`);
        }
    };

    const disconnect = async () => {
        try {
            if (client) {
                await client.disconnect();
                client = null;
                console.log("Disconnected RabbitMQ")
            }
        } catch (error) {
            throw new Error(`Error disconnecting from RabbitMQ: ${error}`);
        }
    };

    return {
        connect,
        disconnect,
    };
})();

module.exports = { RedisInstance }