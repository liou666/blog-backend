const {URL}=require("url")

const {ErrorModel}=require("./src/model/responseModel")
const listRoute=require("./src/router/blogRoute")

const handler=(req,res)=>{
    res.setHeader("Content-Type",'application/json')

    const {searchParams,pathname} = new URL(req.url,"http://"+req.headers.host);
    console.log(req.method,pathname);
    req.query=Object.fromEntries(searchParams)

    const list= listRoute(req,res,pathname)
    res.end(JSON.stringify(list))

}

module.exports=handler 