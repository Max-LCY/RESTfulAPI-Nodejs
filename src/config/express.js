/* express.js */
import express from 'express'
// import bodyParser from 'body-parser' // Express 4 built-in
import cors from 'cors'
import morgan from 'morgan'
import httpStatus from 'http-status'
import { ValidationError } from 'express-validation'
import config from './config'
import index from '../server/routes/index.route'
import APPError from '../server/helper/AppError'

const app = express()

// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// HTTP request logger middleware for node.js
app.use(morgan('dev'))

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    let errorMessage
    let errorCode
    let errorStatus
    // express validation error 所有傳入參數驗證錯誤
    if (err instanceof ValidationError) {
        if (
            err.errors[0].location === 'query' ||
            err.errors[0].location === 'body'
        ) {
            errorMessage = err.errors[0].messages
            errorCode = 400
            errorStatus = httpStatus.BAD_REQUEST
        }
        const error = new APPError.APIError(
            errorMessage,
            errorStatus,
            true,
            errorCode
        )
        return next(error)
    }
    return next(err)
})

// error handler, send stacktrace only during development 錯誤後最後才跑這邊
app.use((err, req, res, next) => {
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        code: err.code ? err.code : httpStatus[err.status],
        stack: config.env === 'development' ? err.stack : {},
    })
    next()
})

/* GET home page. */
app.get('/', (req, res) => {
    res.send(
        `server started on  port http://127.0.0.1:${config.port} (${config.env})`
    )
})

app.use('/api', index)

export default app
