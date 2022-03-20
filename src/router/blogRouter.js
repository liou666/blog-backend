const {
    getAllList,
    updateList,
    addList,
    deleteList,
    getListDetail
} = require("../controller/blogController")
const { SucceedModel, ErrorModel } = require("../model/responseModel")


const { get, set } = require("../db/redis")

const checkLogin = (req) => {
    if (!req.session?.username) {
        return new ErrorModel("未登录")
    }
}

module.exports = async (req, res) => {

    const { method, pathname } = req
    // if (!checkLogin(req)) {
    //     console.log(123);
    //     return checkLogin(req)
  
    if (method === "GET" && pathname === "/blog/list") {
        try {
            const result = await getAllList(req.query)
            return new SucceedModel(result, "succeed")
        } catch (error) {
            return new ErrorModel(error.sqlMessage)
        }
    }

    if (method === "POST" && pathname === "/blog/update") {

        try {
            const result = await updateList(req.body)
            return result.affectedRows > 0 ? new SucceedModel("更新成功") : new ErrorModel("更新失败")
        } catch (error) {
            return new ErrorModel(error.sqlMessage)
        }
    }


    if (method === "POST" && pathname === "/blog/add") {
        try {
            const result = await addList(req.body)
            return result.affectedRows > 0 ? new SucceedModel("操作成功") : new ErrorModel("操作失败")
        } catch (error) {
            return new ErrorModel(error.sqlMessage)
        }
    }

    if (method === "POST" && pathname === "/blog/delete") {
        const author = "ss"
        try {
            const result = await deleteList(req.query.id, author)
            return result.affectedRows > 0 ? new SucceedModel("删除成功") : new ErrorModel("删除失败")
        } catch (error) {
            return new ErrorModel(error.sqlMessage)
        }
    }


    if (method === "GET" && pathname === "/blog/detail") {
        try {
            const result = await getListDetail(req.query.id, "succeed")
            return new SucceedModel(result)
        } catch (error) {
            return new ErrorModel(error.sqlMessage)
        }
    }



}