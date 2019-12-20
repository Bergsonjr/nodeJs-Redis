const config = require('../config/config')
const Redis = require('ioredis')
let redis

let classRedis = {
    init: () => {
        if (!redis) {
            redis = new Redis(config.REDIS)
        }
    },

    get: async (token) => {
        try{
            classRedis.init()
            return JSON.parse(await redis.get(token))
        }
        catch(err){
            return err
        }
    },

    set: (token, value) => {
        classRedis.init()
        return new Promise((resolve, reject) => {
            redis.set(token, JSON.stringify(value), 'EX', 86400, (err, data) => {
                !err ? resolve(data) : reject(err)
            })
        })
    }
}

module.exports = classRedis