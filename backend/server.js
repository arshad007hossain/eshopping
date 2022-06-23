import  express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import { NotFound, errorHandler } from './middleware/errorMiddleware.js'
import products from './data/products.js'

import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send("api is running")
})

app.use('/api/products', productRoutes)

app.use(NotFound)

app.use(errorHandler)

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find(p=> p._id === req.params.id)
//     res.json(product)
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res)=> {
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
})