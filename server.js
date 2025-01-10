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
import { unless } from 'express-unless'
import { LoginValidator } from './middlewares/validator.middleware.js'

const app = express()
const port = process.env.PORT || 9000

app.use(cors(
    {
        origin: process.env.CLIENT || 'https://that-ak-guy.github.io',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
))

SessionVerify.unless = unless

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("This is the home")
})

app.use('/api/auth', AuthRouter)
app.use('/api/feed', FeedRouter)
app.use('/api/vault', SessionVerify, VaultRouter)
app.get('/cook', (req, res) => {
    console.log(req.cookies.refreshToken)
    res.cookie('refreshToken', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxMjM0NSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzY0OTAxNzksImV4cCI6MTczNjUzMzM3OX0.dOl8369XMucTllFP3VANVM3dkBBIfAZhdTumQffoAu-VEujwtWDpvhMTzT8cXfGsaKXCtwQHgwFpZ5yp-zMIwAz8oB7QG2tWk6vIwFczXqiALxMz_lEr4-kiqhUBQB8_MG4F78DIHNdJgQ-xlVa1fYMSEz2fuBq-G5CGCHDnXtWfhCOBzN4uky7K-4az0bjNOfYIlWs9LGL8VBWqwQS2h0bXaK66QZUTlc9cbRkYJRBf6CcxObSI2oExh13Vm-ixwROQPOJ7GhIiraZ82WDOjjaBBL1gBWJ1pwZfB8e-fnmtJ8uiHQHyHFLfma9Xnck9EoV8quGpJtwTlaMPeybe5JXqenJ8uPfOg02uK0JEx5Mf7anlIzwf0rWJ9HkNR6OpGAJxuyxJN24a0SWyRwYbQOwRd04wZHCWBo13Uyi2xYtYa6CA9-wU3hyU9CUh-PL5NOXHbh1MhauVtJXYQS_YMcXid6-iXC1bf5AONrf2F0io7huqyVDcyKUEjobpNiDU')
    res.send('cookie set')
})



// READY FOR PRODUCTION

app.use('/refresh', RefreshRouter)
app.use(ErrorHandler)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


