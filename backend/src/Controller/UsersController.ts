import { request, Request, Response } from "express";
import mssql from 'mssql'
import { sqlConfig } from "../Config/Config";
import { v4 as uid } from 'uuid'
import bcrypt from 'bcrypt'
import { UserSchema, UserSchema2 } from '../Helper/UserValidator'
import { User } from '../Interfaces/interfaces'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

import { Data } from '../Interfaces/interfaces'

interface Extended extends Request {
    info?: Data
}

interface ExtendedRequest extends Request {
    body: {
        name: string
        email: string
        password: string
    }
}
export const registerUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const id = uid()
        const { name, email, password } = req.body
        const { error, value } = UserSchema.validate(req.body)
        if (error) {
            return res.json({ error: error.details[0].message })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        await pool.request()
            .input('id', mssql.VarChar, id)
            .input('name', mssql.VarChar, name)
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, hashedpassword)
            .execute('insertUser')


        res.json({ message: 'Registered new user...' })
    } catch (error) {
        res.json({ error })
    }

}


export const loginUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const { name, email, password } = req.body
        const pool = await mssql.connect(sqlConfig)
        const { error, value } = UserSchema2.validate(req.body)
        if (error) {
            return res.json({ error: error.details[0].message })
        }
        const user: User[] = await (await pool.request()
            .input('email', mssql.VarChar, email)
            .execute('getUser')).recordset


        if (!user) {
            return res.json({ message: 'User Not Found' })
        }

        const validPassword = await bcrypt.compare(password, user[0].password)
        if (!validPassword) {
            return res.json({ message: 'Invalid password' })
        }
        const payload = user.map(item => {
            const { password, ...rest } = item
            return rest
        })
        const token = jwt.sign(payload[0], process.env.KEY as string, { expiresIn: '3600s' })
        res.json({
            message: 'Logged in',
            token
        })

    } catch (error) {
        res.json({ error })
    }

}


export const getHomepage = async (req: Extended, res: Response) => {
    if (req.info) {
        console.log(req.info);

        return res.json({ message: `Welcome to the Homepage ${req.info.email}` })
    }
}

export const checkUser = async (req: Extended, res: Response) => {
    console.log('HERE =>');

    if (req.info) {
        // console.log(req.info);

        res.json({ name: req.info.name, role: req.info.role, email: req.info.email })
    }
}
export const getallusers = async (req: Extended, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const allusers = await (await pool.request().execute("getallusers")).recordset
        console.log(allusers);
        res.json(allusers)

    } catch (error) {
        console.log(error);

    }

}