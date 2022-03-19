const { exec } = require("../db/mysql")

const getAllList = async ({ title, author }) => {
    let sql = `SELECT * FROM blogs where 1=1 `
    if (title) {
        sql += ` and title like "%${title}%" `
    }
    if (author) {
        sql += ` and author="${author}" `
    }
    return await exec(sql)
}

const updateList = async ({ id, blogData = {} }) => {
    const { title, content } = blogData
    let sql = `UPDATE blogs set title="${title}",content="${content}" where id=${id}`
    return await exec(sql)
}

const addList = async ({ title, author, content }) => {
    const create_time = new Date()
    const sql = `INSERT INTO blogs
               (title,content,create_time,author) 
               values 
               ('${title}',"${content}","2021-3-4 10:00:00",'${author}')`
    return await exec(sql)
}

const deleteList = async (id, author) => {
    const sql = `DELETE FROM blogs where id = ${id} and author = "${author}"`
    return await exec(sql)
}

const getListDetail = async (id) => {
    let sql = `SELECT * FROM blogs where id= ${id} `
    return await exec(sql)
}


module.exports = {
    getAllList,
    updateList,
    addList,
    deleteList,
    getListDetail
}