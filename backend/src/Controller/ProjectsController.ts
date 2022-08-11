import { request, Request, Response } from "express";
import mssql, { pool } from 'mssql'
import { sqlConfig } from "../Config/Config";
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import { UserSchema, UserSchema2, UserSchema3 } from'../Helper/UserValidator'
import {User} from '../Interfaces/interfaces'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

import {Project} from '../Interfaces/interfaces'

interface Extended extends Request{
    info?:Project
}

interface ExtendedRequest extends Request{
    body:{
        name: string
        description:string
        end_date:string
    }
}
export const addNewProject=async( req:ExtendedRequest, res:Response)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        const id =uid()
        const {name,description, end_date}= req.body
        const {error , value}= UserSchema3.validate(req.body)
        if(error){
            return res.json({error:error.details[0].message})
        }
    
        await pool.request()
        . input('id', mssql.VarChar, id)
        . input('name', mssql.VarChar, name)
        . input('description', mssql.VarChar, description)
        . input('end_date', mssql.VarChar, end_date)
        .execute('insertProject')

      
        res.json({message:'Added new Project...'})
    } catch (error) {
        res.json({error})
    }

}

export const getprojectdata = async()=>{
try {
    const pool = await mssql.connect(sqlConfig)
    const allprojects: Project[]= await(await pool.request().query(`
    SELECT * FROM projectsTable`)).recordset
    console.log(allprojects);
    
} catch (error) {
    console.log(error);
    
}

}