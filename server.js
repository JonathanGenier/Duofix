const Next = require('next')
const Dev = process.env.NODE_ENV !== 'production'
const Next_app = Next({ dev: Dev })
const Express = require('express')
const Handle = Next_app.getRequestHandler()
const Configs = require('./configs.json')

Next_app.prepare().then(() => {

    const Server = Express()

    Server.listen(Configs.port, () => {
        console.log("\x1b[33mListening requests on port", Configs.port, "\x1b[0m")
    })

    Server.all('*', (req, res) => {
        return Handle(req, res)
    })
})