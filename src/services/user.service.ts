import { Request, Response } from "express";
import { User } from "../models/users.model";
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import axios from 'axios'

export const userService = {
    register: async (req: Request, res: Response) => {
        const uid = uuidv4()
        const { name, surname, email, password } = req.body;
        try {
            const queryEmail = await User.findOne({
                where: {email}
            })
            if(queryEmail?.email) {
                return res.status(401).json({
                    ok: false,
                    message: "Correo ya registrado"
                });
            }
            const hash = await bcrypt.hash(password, 10)

            await User.create({
                uid,
                name,
                surname,
                email,
                password: hash
            })
            const payload = {
                id: uid,
                name: name,
                email: email
            }
            let token = jwt.sign(payload, 'my-secret-key', {
                expiresIn: '29 days'
            })
            return res.status(201).json({
                ok: true,
                message: 'Ususario creado',
                token
            })
            
        } catch (error) {
            throw new Error()
        }
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const secret = process.env.SECRET
        try {
            const query = await User.findOne({
                where: {email}
            })
            if(query === null){
                return res.status(400).json({
                    ok: true,
                    message: 'Usuario no existe'
                })
            }
            if(bcrypt.compareSync(password, query.password) === true) {
                const payload = {
                    id: query.uid,
                    name: query.name,
                    email: query.email
                }
                let token = jwt.sign(payload, 'my-secret-key', {
                    expiresIn: '29 days'
                })
                return res.status(200).json({
                    ok: true,
                    token
                })
            } else {
                return res.status(400).json({
                    ok: false,
                    message: "Email o contraseña incorrecta"
                })
            }
        } catch (error) {
            throw new Error()
        }
    },

    getTransfers: async (req:Request, res: Response) => {
        const {
            ftype,
            fcode,
            ttype,
            tcode,
            outbound,
            inbound,
            adults,
            children,
            infants
        } = req.query
        try {
            const transfers = await axios.get(`${process.env.URL}availability/en/from/${ftype}/${fcode}/to/${ttype}/${tcode}/${outbound}/${inbound}/${adults}/${children}/${infants}`, {
                headers: {
                    'Api-key': process.env.API_KEY,
                    "X-Signature": process.env.X_SIGNATURE
                }
            })
            return res.status(200).json({
                ok: true,
                response: transfers.data.services
            })
        } catch (error) {
            console.error(error)
        }
    },

    reserveTransfer: async (req: Request, res: Response) => {
        const { 
            name,
            surname,
            email,
            phone,
            rateKey,
            direction
         } = req.body
        try {
            const transfer = await axios.post(`${process.env.URL}bookings`, {
                    language: "en",
                    holder: {
                        name,
                        surname,
                        email,
                        phone
                    },
                    transfers: [
                        {
                            rateKey,
                            transferDetails: [
                                {
                                    type: "FLIGHT",
                                    direction,
                                    code: "XR1234",
                                    companyName: null
                                }
                            ]
                        }
                    ],                    
                    clientReference: "BOSTON#12-203#456754",
                    welcomeMessage: "Welcome",
                    remark: "Booking remarks go here."

            }, {
                headers: {
                    'Api-key': process.env.API_KEY,
                    "X-Signature": process.env.X_SIGNATURE
                }
            })
            return res.status(201).json({
                ok: true,
                response: transfer.data
            })
        } catch (error) {
            return res.status(401).json({
                error,
                message: 'Authorization field missing'
            })
        }
    }
}