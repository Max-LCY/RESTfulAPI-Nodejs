// article.route.js
import express from 'express'
import { validate } from 'express-validation'
import articleCtrl from '../controllers/article.controller'
import paramValidation from '../../config/param-validation'

const router = express.Router()

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

export default router
