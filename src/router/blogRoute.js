const {getAllList}=require("../controller/blogController")
const {SucceedModel}=require("../model/responseModel")

module.exports=(req,res,pathname)=>{
    
    if(req.method==="GET"&&pathname==="/list"){
        const result=getAllList()
        return new SucceedModel(result,"succeed")
    }


    res.statusCode=404
    res.end("not fount 😔")
    return false
    
}