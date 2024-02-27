import { Request, Response } from "express";
import { User } from "../models/users.model";
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'

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
            return res.status(201).json({
                ok: true,
                message: 'Ususario creado'
            })
            
        } catch (error) {
            throw new Error(error)
        }
    }
}