const uuidv1 = require('uuid/v1')
const redisRepository = require('../repository/redisRepository')

module.exports = {
    generateCache: async (req, res, next) => {
        let token = uuidv1();
        await redisRepository.set(token, req.body.values)
        obj = { token }
        res.send(obj)
        next()
    },

    getUser: async (req, res, next) => {
        let token = req.query.token
        let user = await redisRepository.get(token)
        res.json({ data: user != {} ? user : "Token não encontrado" })
        next()
    }
}