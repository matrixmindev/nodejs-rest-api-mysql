import express from 'express'
import { customersRouter } from './routes/customers.routes.js';
import { indexRouter } from './routes/index.routes.js';
import { notFound } from './controllers/notFound.controllers.js';
export const app = express()


app.use(express.json())

app.use( indexRouter )

//use route
app.use('/api/customers',customersRouter)


//todas las rutas q se escapan pasan a 404
app.use( notFound)