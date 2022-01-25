'use strict'

const {URL}=require("url")

const {ErrorModel}=require("./src/model/responseModel")
const listRoute=require("./src/router/blogRoute")

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

    req.body =  await getRequestBody(req)

    
    const list= listRoute(req,res,pathname)
    if(list){
       return res.end(JSON.stringify(list))
    }
  

}

module.exports=handler 