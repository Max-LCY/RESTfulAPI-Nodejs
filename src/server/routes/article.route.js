// article.route.js
import express from 'express'
import { validate } from 'express-validation'
import articleCtrl from '../controllers/article.controller'
import paramValidation from '../../config/param-validation'

const router = express.Router()

const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization
    console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ') // 字串切割
        const bearerToken = bearer[1] // 取得 JWT
        req.token = bearerToken // 在response中建立一個token參數
        next() // 結束 Middleware 進入 articleCtrl.articlePersonalGet
    } else {
        res.status(403).send({ code: 403, message: '您尚未登入！' }) // Header 查無 Rearer Token
    }
}

/** 新增 Article 值組 */
router
    .route('/')
    .get(articleCtrl.articleGet)
    .post(
        validate(paramValidation.createArticle, {
            context: true,
            statusCode: 400,
            keyByField: true,
        }),
        articleCtrl.articlePost
    )

router
    .route('/:article_id')
    .put(articleCtrl.articlePut)
    .delete(articleCtrl.articleDelete)

router.get('/personal', ensureToken, articleCtrl.articlePersonalGet)

export default router
