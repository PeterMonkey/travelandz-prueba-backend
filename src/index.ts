import express, { Application } from 'express';
import bodyParser from 'body-parser'
import { connection } from './database/database';
import userRoute from './routes/user.route'

const app: Application = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

connection()

//routes
app.use(userRoute)

app.listen(3000, () => console.log('Server listen on port:3000'))
