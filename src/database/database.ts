import { Sequelize } from "sequelize-typescript";
import { User } from "../models/users.model";


const sequelize = new Sequelize({
    host: '172.17.0.2',
    dialect: "mysql",
    username: "root",
    password: "12345",
    database: 'travel',
    logging: false,
    models: [User]
})

export function connection() {
    try {
        sequelize.sync({alter: true})
        console.log('Connection has been established successfully.')
    } catch (error) {
        throw new Error('Unable to connect to the database')
    }
}