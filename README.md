# Prueba para travelandz | Backend

Esta es la aplicacion del lado del servidor para travelandz, desrarrollada en: 

* Nodejs
* TypeScript 
* Mysql como base de datos
*  Api de [hotelbeds](https://developer.hotelbeds.com/documentation/transfers/) 

## Instalación

Situarse en la raiz del proyecto y ejecutar los siguientes comandos.

```bash
npm install
```

## Coneccion a la base de datos

Configure las variables para conectarse a la base de datos

```javascript
//database/database.ts
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/users.model";


const sequelize = new Sequelize({
    host: '172.17.0.2',
    dialect: "",
    username: "",
    password: "",
    database: '',
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
```
## Ejecución

Situarse en la raiz del proyecto y ejecutar el siguiente comando.

```bash
npm run dev
