import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    // 建立一個連線池
    connectionLimit: 10, // 限制池子連線人數
    host: config.mysqlHost, // 主機名稱
    user: config.mysqlUserName, // 用戶名稱
    password: config.mysqlPass, // 資料庫密碼
    database: config.mysqlDatabase, // 資料庫名稱
})

const selectArticle = () => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            // 資料庫連線
            if (connectionError) {
                reject(connectionError) // 若連線有問題回傳錯誤
            } else {
                connection.query(
                    // Article撈取所有欄位的值組
                    `SELECT
            *
          FROM
            Article`,
                    (error, result) => {
                        if (error) {
                            console.error('SQL error: ', error)
                            reject(error) // 寫入資料庫有問題時回傳錯誤
                        } else {
                            resolve(result) // 撈取成功回傳 JSON 資料
                        }
                        connection.release()
                    }
                )
            }
        })
    })
}

/* Article  POST 新增 */
const createArticle = (insertValues) => {
    console.log(insertValues)

    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            // 資料庫連線
            if (connectionError) {
                reject(connectionError) // 若連線有問題回傳錯誤
            } else {
                connection.query(
                    'INSERT INTO Article SET ?',
                    insertValues,
                    (error, result) => {
                        // Article資料表寫入一筆資料
                        if (error) {
                            console.error('SQL error: ', error) // 寫入資料庫有問題時回傳錯誤
                            reject(error)
                        } else if (result.affectedRows === 1) {
                            resolve(`新增成功！ article_id: ${result.insertId}`) // 寫入成功回傳寫入id
                        }
                        connection.release()
                    }
                )
            }
        })
    })
}

const modifyArticle = (insertValues, userId) => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            // 資料庫連線
            if (connectionError) {
                reject(connectionError) // 若連線有問題回傳錯誤
            } else {
                // Article資料表修改指定id一筆資料
                connection.query(
                    'UPDATE Article SET ? WHERE article_id = ?',
                    [insertValues, userId],
                    (error, result) => {
                        if (error) {
                            console.error('SQL error: ', error) // 寫入資料庫有問題時回傳錯誤
                            reject(error)
                        } else if (result.affectedRows === 0) {
                            // 寫入時發現無該筆資料
                            resolve('請確認修改Id！')
                        } else if (result.message.match('Changed: 1')) {
                            // 寫入成功
                            resolve('資料修改成功')
                        } else {
                            resolve('資料無異動')
                        }
                        connection.release()
                    }
                )
            }
        })
    })
}

const deleteArticle = (userId) => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            // 資料庫連線
            if (connectionError) {
                reject(connectionError) // 若連線有問題回傳錯誤
            } else {
                // Article資料表刪除指定id一筆資料
                connection.query(
                    'DELETE FROM Article WHERE article_id = ?',
                    userId,
                    (error, result) => {
                        if (error) {
                            console.error('SQL error: ', error) // 資料庫存取有問題時回傳錯誤
                            reject(error)
                        } else if (result.affectedRows === 1) {
                            resolve('刪除成功！')
                        } else {
                            resolve('刪除失敗！')
                        }
                        connection.release()
                    }
                )
            }
        })
    })
}

export default {
    selectArticle,
    createArticle,
    modifyArticle,
    deleteArticle,
}
