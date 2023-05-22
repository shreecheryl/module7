import express from 'express'
import {} from 'dotenv/config'
import routes from './routes/routes.js'
import connectDB from './db/connect.js'
import bodyParser from 'body-parser'
import path from 'path'

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false })) // middleware
app.use(bodyParser.json()) // required middleware
app.use('/', routes)

app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

const PORT = process.env.PORT || 5500

const init = async () => {
    try {
        await connectDB(process.env.DB)
        console.log('Connected to database...')
        app.listen(PORT, () => console.log(`Server working on port ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}

init()

