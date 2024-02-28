import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
    id: string,
    name: string,
    email: string
}

type TRequest = Request | any

export const validationToken = (req: TRequest, res: Response, next: NextFunction) => {

    const token = req.header('auth-token')

    try {
        if (!token) return res.status(401). json({ ok: false, status: 'ACCESS DENIED' });
        const payload = jwt.verify(token, 'my-secret-key') as Payload

        req.userId = payload
        next()
    } catch (error) {
        console.error(error)
    }
}