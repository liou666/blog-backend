/*
 * @Description:
 * @Autor: Liou
 * @Date: 2022-03-19 17:52:53
 * @LastEditors: Liou
 * @LastEditTime: 2022-03-19 19:04:51
 */
const redis = require('redis');

const { REDIS_CONFIG: { port, host } } = require("../config/db")
const redisUrl = "redis://127.0.0.1:6379"
const client = redis.createClient(redisUrl);

client.connect()
client.on('error', err => {
    console.log(err);
});

const set = async (key, value) => {
    if (typeof value === "object") {
        value = JSON.stringify(value)
    }
    await client.set(key, value)
}

const get = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key).then(val => {
            if (val === null) {
                resolve(null)
            }
            try {
                resolve(JSON.parse(val))
            } catch (_) {
                resolve(val)
            }
        }).catch(err => {
            reject(err)
        })
    })

}

module.exports = {
    get,
    set
}