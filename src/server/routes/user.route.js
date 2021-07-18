// article.route.js
import express from 'express'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

/** 新增 Article 值組 */
router.route('/').get(userCtrl.userGet).post(userCtrl.userPost)

router
    .route('/:user_id')
    .put(userCtrl.userPut) /** 修改 User 值組 */
    .delete(userCtrl.userDelete) /** 刪除 User 值組 */

export default router
