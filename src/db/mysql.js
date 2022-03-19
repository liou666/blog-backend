/*
 * @Description:
 * @Autor: Liou
 * @Date: 2022-03-19 13:45:03
 * @LastEditors: Liou
 * @LastEditTime: 2022-03-19 13:45:03
 */
const mysql = require("mysql2")

const { MYSQL_CONFIG } = require("../config/db")

const connection = mysql.createConnection(MYSQL_CONFIG);


const exec = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fileds) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        });
    })
}
module.exports = {
    exec
}


