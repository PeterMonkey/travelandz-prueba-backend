import { Request, Response } from "express";
import axios from 'axios'

export const transfersCacheService = {
    getCountries: async (req: Request, res: Response) => {
        const url = process.env.URL_CACHE
        try {
            const countries = await axios.get(`${url}locations/countries?fields=ALL&language=ES&offset=1&limit=300`, {
                headers: {
                    'Api-key': process.env.API_KEY,
                    "X-Signature": process.env.X_SIGNATURE
                }
            })
            return res.status(200).json({
                ok: true,
                response: countries.data
            })
        } catch (error) {
            console.error(error)
        }
    }
}