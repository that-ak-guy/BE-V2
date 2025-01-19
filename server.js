import express from 'express'
import { SessionVerify } from './middlewares/session.middleware.js'
import FeedRouter from './routes/feed.router.js'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/auth.router.js'
import './config/initenv.js'
import cors from 'cors'
import VaultRouter from './routes/vault.router.js'
import RefreshRouter from './routes/refresh.router.js'
import { ErrorHandler } from './middlewares/errors.middleware.js'
import { ErrorLogger, ErrorLogID } from './middlewares/logger.middleware.js'


const app = express()


const port = process.env.PORT || 9000


app.use(cors(
    {
        origin: process.env.CLIENT || 'https://that-ak-guy.github.io',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
))
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send("This is the home")
})
app.use('/api/auth', AuthRouter)
app.use('/api/feed', FeedRouter)
app.use('/api/vault', SessionVerify, VaultRouter)
app.use('/refresh', RefreshRouter)

app.use(ErrorLogID)
app.use(ErrorLogger)
app.use(ErrorHandler)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


