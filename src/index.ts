import express, { Application } from 'express';
import bodyParser from 'body-parser'
import { connection } from './database/database';

const app: Application = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

connection()

app.listen(3000, () => console.log('Server listen on port:3000'))
