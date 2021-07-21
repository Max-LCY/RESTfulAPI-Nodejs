// article.route.js
import express from 'express'
import { validate } from 'express-validation'
import userCtrl from '../controllers/user.controller'
import paramValidation from '../../config/param-validation'

const router = express.Router()

/** 新增 Article 值組 */
router
    .route('/')
    .get(userCtrl.userGet)
    .post(validate(paramValidation.createUser), userCtrl.userPost)

router
    .route('/:user_id')
    .put(userCtrl.userPut) /** 修改 User 值組 */
    .delete(userCtrl.userDelete) /** 刪除 User 值組 */

router.route('/login').post(userCtrl.userLogin)

export default router
