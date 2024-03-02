import express, { Application } from 'express';
import bodyParser from 'body-parser'
import { connection } from './database/database';
import userRoute from './routes/user.route'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

connection()

//routes
app.use(userRoute)
console.log(process.env.SECRET)
app.listen(3000, () => console.log('Server listen on port:3000'))
