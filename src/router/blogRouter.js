const {
    getAllList,
    updateList,
    addList, 
    deleteList,
    getListDetail
}=require("../controller/blogController")
const {SucceedModel}=require("../model/responseModel")

module.exports=(req,res)=>{

    const {method,pathname}=req
    
    if(method==="GET"&&pathname==="/blog/all"){
        const result=getAllList()
        return new SucceedModel(result,"succeed")
    }

    if(method==="POST"&&pathname==="/blog/update"){
        const result=updateList(req.body)
        return new SucceedModel(result)
    }


    if(method==="POST"&&pathname==="/blog/add"){
        const result=addList(req.body)
        return new SucceedModel(result)
    }

    if(method==="POST"&&pathname==="/blog/delete"){
        const result=deleteList(req.query.id)
        return new SucceedModel(result)
    }

    
    if(method==="GET"&&pathname==="/blog/detail"){
        const result=getListDetail(req.query.id,"succeed")
        return new SucceedModel(result)
    }

   
    
}