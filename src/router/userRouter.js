/*
 * @Description:
 * @Autor: Liou
 * @Date: 2022-03-19 14:58:35
 * @LastEditors: Liou
 * @LastEditTime: 2022-03-19 16:21:02
 */
const {
    login,
    register,
    logOut
} = require("../controller/userController")
const { SucceedModel, ErrorModel } = require("../model/responseModel")

module.exports = async (req, res) => {

    const { method, pathname } = req

    if (method === "POST" && pathname === "/login") {
        try {
            const result = await login(req.body)
            return result.length ? new SucceedModel("登录成功") : new ErrorModel("用户名或密码错误")
        } catch (error) {
            return new ErrorModel(error.sqlMessage)
        }
    }
}