// article.controller.js
import to from 'await-to-js'
import articleModule from '../modules/article.module'

const articlePersonalGet = async (req, res) => {
    const [err, result] = await to(
        articleModule.selectPersonalArticle(req.token)
    )

    if (err) {
        res.status(401).send(err) // 失敗回傳錯誤訊息
    } else {
        res.send(result)
    }
}

const articleGet = async (req, res) => {
    const [err, result] = await to(articleModule.selectArticle())

    if (err) {
        res.send(err) // 失敗回傳錯誤訊息
    } else {
        res.send(result)
    }
}

/* Article  POST 新增 */
const articlePost = async (req, res) => {
    // 取得新增參數
    const insertValues = req.body
    const [err, result] = await to(articleModule.createArticle(insertValues))

    if (err) {
        res.send(err) // 失敗回傳錯誤訊息
    } else {
        res.send(result)
    }
}

/* Article PUT 修改 */
const articlePut = async (req, res) => {
    // 取得修改id
    const userId = req.params.article_id
    // 取得修改參數
    const insertValues = req.body
    const [err, result] = await to(
        articleModule.modifyArticle(insertValues, userId)
    )

    if (err) {
        res.send(err) // 失敗回傳錯誤訊息
    } else {
        res.send(result)
    }
}

const articleDelete = async (req, res) => {
    // 取得刪除id
    const userId = req.params.article_id
    const [err, result] = await to(articleModule.deleteArticle(userId))

    if (err) {
        res.send(err) // 失敗回傳錯誤訊息
    } else {
        res.send(result)
    }
}

export default {
    articleGet,
    articlePost,
    articlePut,
    articleDelete,
    articlePersonalGet,
}
