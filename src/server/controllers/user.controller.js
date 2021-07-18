// user.controller.js
import to from 'await-to-js'
import bcrypt from 'bcrypt'
import userModule from '../modules/user.module'

/* User  POST 新增 */
const userPost = async (req, res) => {
    // 取得新增參數
    const insertValues = {
        user_name: req.body.user_name,
        user_mail: req.body.user_mail,
        user_password: bcrypt.hashSync(req.body.user_password, 10), // 密碼加密
    }

    const [err, result] = await to(userModule.createUser(insertValues))

    if (err) {
        res.send(err) // 失敗回傳錯誤訊息
    } else {
        res.send(result)
    }
}

const userGet = async (req, res) => {
    // 取得新增參數
    const [err, result] = await to(userModule.selectUser())

    if (err) {
        res.send(err) // 失敗回傳錯誤訊息
    } else {
        res.send(result)
    }
}

const userPut = async (req, res) => {
    // 取得修改id
    const userId = req.params.user_id
    const insertValues = req.body
    // 取得新增參數
    const [err, result] = await to(userModule.modifyUser(insertValues, userId))

    if (err) {
        res.send(err) // 失敗回傳錯誤訊息
    } else {
        res.send(result)
    }
}

const userDelete = async (req, res) => {
    const userId = req.params.user_id
    // 取得新增參數
    const [err, result] = await to(userModule.deleteUser(userId))

    if (err) {
        res.send(err) // 失敗回傳錯誤訊息
    } else {
        res.send(result)
    }
}

export default {
    userPost,
    userGet,
    userPut,
    userDelete,
}
