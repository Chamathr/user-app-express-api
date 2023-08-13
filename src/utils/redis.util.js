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
                url: `redis://${redisHost}:${redisPort}`,
                password: redisPassword
            });

            await client.connect();

            console.log("Connected Redis")
            
            return client;
        } catch (error) {
            throw new Error(`Error connecting to Redis: ${error}`);
        }
    };

    const disconnect = async () => {
        try {
            if (client) {
                await client.disconnect();
                client = null;
                console.log("Disconnected Redis")
            }
        } catch (error) {
            throw new Error(`Error disconnecting from Redis: ${error}`);
        }
    };

    return {
        connect,
        disconnect,
    };
})();

module.exports = { RedisInstance }