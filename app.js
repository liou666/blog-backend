'use strict'

const { URL } = require("url")

const blogRouter = require("./src/router/blogRouter")
const userRouter = require("./src/router/userRouter")


const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let data = ''
        req.on("data", chunk => {
            data += chunk.toString()
        })
        req.on("error", err => {
            reject(err)
        })
        req.on("end", () => {
            let result = data || JSON.stringify({})
            resolve(JSON.parse(result))
        })
    })

}

const handler = async (req, res) => {
    res.setHeader("Content-Type", 'application/json')

    const { searchParams, pathname } = new URL(req.url, "http://" + req.headers.host);
    console.log(req.method, pathname);

    req.query = Object.fromEntries(searchParams)
    req.pathname = pathname
    req.body = await getRequestBody(req)


    const blog = await blogRouter(req, res)
    if (blog) {
        return res.end(JSON.stringify(blog))
    }

    const user = await userRouter(req, res)
    console.log(user);
    if (user) {
        return res.end(JSON.stringify(user))
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("not fount 😔")


}

module.exports = handler