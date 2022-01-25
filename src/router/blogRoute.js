const {
    getAllList,
    updateList,
    addList, 
    deleteList,
    getListDetail
}=require("../controller/blogController")
const {SucceedModel}=require("../model/responseModel")

module.exports=(req,res,pathname)=>{
    
    if(req.method==="GET"&&pathname==="/list/all"){
        const result=getAllList()
        return new SucceedModel(result,"succeed")
    }

    if(req.method==="POST"&&pathname==="/list/update"){
        const result=updateList(req.body)
        return new SucceedModel(result)
    }


    if(req.method==="POST"&&pathname==="/list/add"){
        const result=addList(req.body)
        return new SucceedModel(result)
    }

    if(req.method==="POST"&&pathname==="/list/delete"){
        const result=deleteList(req.query.id)
        return new SucceedModel(result)
    }

    
    if(req.method==="GET"&&pathname==="/list/detail"){
        const result=getListDetail(req.query.id,"succeed")
        return new SucceedModel(result)
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("not fount 😔")
    return false
    
}