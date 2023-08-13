const Redis = require('../utils/redis.util')

const getRedisCache = async (req, res, next) => {
    try {
        const client = await Redis.RedisInstance.connect()
        const cacheKey = req?.params?.email;
        const data = await client.get(cacheKey);

        if (data !== null) {
            const responseBody = {
                status: 200,
                message: "success",
                body: JSON.parse(data)
            }
            res.status(200).json(responseBody)
        } else {
            next();
        }
    }
    catch (error) {
        console.error(error)
        next()
    }
}

const setRedisCache = async (key, data) => {
    try {
        const client = await Redis.RedisInstance.connect()
        await client.set(key, JSON.stringify(data));
    }
    catch (error) {
        return false
    }
}


module.exports = { getRedisCache, setRedisCache }