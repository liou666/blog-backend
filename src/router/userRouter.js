/*
 * @Description:
 * @Autor: Liou
 * @Date: 2022-03-19 14:58:35
 * @LastEditors: Liou
 * @LastEditTime: 2022-03-19 19:22:48
 */
const cookie = require('cookie');

const {
    login,
    register,
    logOut
} = require("../controller/userController")
const { SucceedModel, ErrorModel } = require("../model/responseModel")
const { set } = require("../db/redis")

module.exports = async (req, res) => {

    const { method, pathname } = req

    if (method === "GET" && pathname === "/login") {
        try {
            const result = await login(req.query)
            if (result.length) {
                await set(req.sessionId, result[0])
                return new SucceedModel("登录成功")
            }
            return new ErrorModel("用户名或密码错误")
        } catch (error) {
            return new ErrorModel(error.sqlMessage)
        }
    }

}