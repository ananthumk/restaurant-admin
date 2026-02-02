require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorHandler')
const router = require('./routes/menuRoutes')
const orderRouter = require('./routes/orderRoutes')
const connectDB = require('./config/database')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use('/api/menu', router)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Api is working'
    })
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000 
app.listen(PORT, () => {console.log(`Server running at http://localhost:${PORT}`)})

module.exports = app;