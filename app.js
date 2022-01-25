'use strict'

const {URL}=require("url")

const {ErrorModel}=require("./src/model/responseModel")
const blogRouter=require("./src/router/blogRouter")

const getRequestBody= (req)=>{
    return new Promise((resolve,reject)=>{
        let data=''
        req.on("data",chunk=>{
            data+=chunk.toString()
        })
        req.on("error",err=>{
            reject(err)
        })
        req.on("end",()=>{
            let result=data||JSON.stringify({})
            resolve(JSON.parse(result))
        })
    })
   
}

const handler=async (req,res)=>{
    res.setHeader("Content-Type",'application/json')

    const {searchParams,pathname} = new URL(req.url,"http://"+req.headers.host);
    console.log(req.method,pathname);

    req.query=Object.fromEntries(searchParams)
    req.pathname=pathname
    req.body =  await getRequestBody(req)

    
    const list= blogRouter(req,res)
    if(list){
       return res.end(JSON.stringify(list))
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("not fount 😔")
  

}

module.exports=handler 