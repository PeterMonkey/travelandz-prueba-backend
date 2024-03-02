import { Request, Response } from "express";
import axios from 'axios'

export const transfersCacheService = {
    getCountries: async (req: Request, res: Response) => {
        const url = process.env.URL_CACHE
        try {
            const countries = await axios.get(`${url}locations/countries?fields=ALL&language=ES&offset=1&limit=300`, {
                headers: {
                    'Api-key': process.env.API_KEY
                }
            })
            return res.status(200).json({
                ok: true,
                response: countries.data
            })
        } catch (error) {
            console.error(error)
        }
    }, 

    getDestinations: async (req: Request, res: Response) => {
        const url = process.env.URL_CACHE
        const {countryCodes} = req.query;
        try {
            const destinations = await axios.get(`${url}locations/destinations?fields=ALL&language=es&countryCodes=${countryCodes}`, {
                headers: {
                    'Api-key': process.env.API_KEY
                }
            })
            return res.status(200).json({
                ok: true,
                response: destinations.data
            })
        } catch (error) {
            console.error(error)
        }
    },

    getTerminals: async (req: Request, res: Response) => {
        const url = process.env.URL_CACHE
        const {code} = req.query;
        try {
            const terminals = await axios.get(`${url}locations/terminals?fields=ALL&language=en&codes=${code}&offset=1&limit=20`, {
                headers: {
                    'Api-key': process.env.API_KEY
                }
            })
            return res.status(200).json({
                ok: true,
                response: terminals.data
            })
        } catch (error) {
            console.error(error)
        }
    }
}