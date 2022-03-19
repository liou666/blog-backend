const {
    getAllList,
    updateList,
    addList,
    deleteList,
    getListDetail
} = require("../controller/blogController")
const { SucceedModel } = require("../model/responseModel")

module.exports = async (req, res) => {

    const { method, pathname } = req

    if (method === "GET" && pathname === "/blog/list") {
        const result = await getAllList(req.query)
        console.log(result);
        return new SucceedModel(result, "succeed")
    }

    if (method === "POST" && pathname === "/blog/update") {
        const result = await updateList(req.body)
        return new SucceedModel(result)
    }


    if (method === "POST" && pathname === "/blog/add") {
        const result = await addList(req.body)
        return new SucceedModel(result)
    }

    if (method === "POST" && pathname === "/blog/delete") {
        const author = "ss"
        const result = await deleteList(req.query.id, author)
        return new SucceedModel(result)
    }


    if (method === "GET" && pathname === "/blog/detail") {
        const result = await getListDetail(req.query.id, "succeed")
        return new SucceedModel(result)
    }



}