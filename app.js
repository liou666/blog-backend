'use strict'

const cookie = require('cookie');

const { get, set } = require("./src/db/redis")

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

    req.cookie = cookie.parse(req.headers.cookie || '');
    req.query = Object.fromEntries(searchParams)
    req.pathname = pathname
    req.body = await getRequestBody(req)


    let userId = req.cookie.userId
    let needSetCookie = false
    if (!userId) {
        needSetCookie = true
        userId = +new Date();
        await set(userId, {})
    }

    req.sessionId = userId

    const sessionData = await get(req.sessionId)
    req.session = sessionData

    console.log(sessionData);

    const blog = await blogRouter(req, res)
    if (blog) {
        if (needSetCookie) {
            res.setHeader('Set-Cookie', cookie.serialize('userId', String(userId), {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/"
            }));
        }
        return res.end(JSON.stringify(blog))
    }

    const user = await userRouter(req, res)
    if (user) {
        if (needSetCookie) {
            res.setHeader('Set-Cookie', cookie.serialize('userId', String(userId), {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/"
            }));
        }
        return res.end(JSON.stringify(user))
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("not fount 😔")


}

module.exports = handler