import config from './config/config'
import app from './config/express'

require('source-map-support').install()

if (module.children) {
    // listen on port config.port
    app.listen(config.port, () => {
        console.log(
            `server started on  port http://127.0.0.1:${config.port} (${config.env})`
        )
    })
}

export default app
