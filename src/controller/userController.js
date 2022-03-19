/*
 * @Description:
 * @Autor: Liou
 * @Date: 2022-03-19 15:01:25
 * @LastEditors: Liou
 * @LastEditTime: 2022-03-19 16:17:32
 */
const { exec } = require("../db/mysql")

const login = async ({ username, password }) => {
    let sql = `SELECT * FROM users where username="${username}" and password=${password}`
    return await exec(sql)
}

const logOut = async ({ title, author }) => {
    let sql = `SELECT * FROM blogs where 1=1 `
    if (title) {
        sql += ` and title like "%${title}%" `
    }
    if (author) {
        sql += ` and author="${author}" `
    }
    return await exec(sql)
}

const register = async ({ title, author }) => {
    let sql = `SELECT * FROM blogs where 1=1 `
    if (title) {
        sql += ` and title like "%${title}%" `
    }
    if (author) {
        sql += ` and author="${author}" `
    }
    return await exec(sql)
}
module.exports = {
    login,
    register,
    logOut
}