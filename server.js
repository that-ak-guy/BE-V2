import express from 'express'
import { SessionVerify } from './middlewares/session.middleware.js'
import FeedRouter from './routes/feed.router.js'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/auth.router.js'
import './config/initenv.js'
import cors from 'cors'

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
app.use(SessionVerify)

app.get('/', (req, res) => {
    res.send("This is the home")
})

app.use('/api/auth', AuthRouter)
app.use('/api/feed', FeedRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
