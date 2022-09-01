import { request, Request, Response } from "express";
import mssql, { pool } from 'mssql'
import { sqlConfig } from "../Config/Config";
import {v4 as uuid} from 'uuid'
import bcrypt from 'bcrypt'
import { UserSchema, UserSchema2, UserSchema3, UserSchema4, UserSchema5, UserSchema6 } from'../Helper/UserValidator'
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
        end_date:string,
        user_id:string,
        project_id:string,
        assigned_user_email:string
    }
}
export const addNewProject=async( req:ExtendedRequest, res:Response)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        const project_id =uuid()
        const {name,description, end_date, assigned_user_email}= req.body
        const {error , value}= UserSchema3.validate(req.body)
        if(error){
            return res.json({error:error.details[0].message})
        }
    
        await pool.request()
        . input('project_id', mssql.VarChar, project_id)
        . input('name', mssql.VarChar, name)
        . input('description', mssql.VarChar, description)
        . input('end_date', mssql.VarChar, end_date)
        . input('assigned_user_email', mssql.VarChar, assigned_user_email)
        .execute('insertProject')

      
        res.json({message:'Added new Project...'})
    } catch (error) {
        res.json({error})
    }

}
export const assignNewProject=async( req:ExtendedRequest, res:Response)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        const {name, description, end_date, assigned_user_email}= req.body
        const {error , value}= UserSchema3.validate(req.body)
        if(error){
            return res.json({error:error.details[0].message})
        }
      
        await pool.request()
        . input('name', mssql.VarChar, name)
        . input('description', mssql.VarChar, description)
        . input('end_date', mssql.VarChar, end_date)
        . input('assigned_user_email', mssql.VarChar, assigned_user_email)
        .execute('assignNewProject')

      
        res.json({message:'Assigned new project...'})
    } catch (error) {
        res.json({error})
    }

}
export const deleteProject=async( req:ExtendedRequest, res:Response)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        const {project_id}= req.body
        const {error , value}= UserSchema6.validate(req.body)
        if(error){
            return res.json({error:error.details[0].message})
        }
      
        await pool.request()
        . input('project_id', mssql.VarChar, project_id)
        .execute('deleteProject')

      
        res.json({message:'Deleted project...'})
    } catch (error) {
        res.json({error})
    }

}
export const getallProjects = async(req: Extended, res: Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        const allprojects:Project[] = await (await pool.request().execute("getallprojects")).recordset
        console.log(allprojects);
        
        res.json(allprojects)
    
    } catch (error) {
        console.log(error);
        
    }
    
    }
    export const getProject = async(req: Extended, res: Response)=>{
        try {
            const pool=await mssql.connect(sqlConfig)
            const assigned_user_email= req.params.email
            
            const getproject:Project[]=await( await pool.request()
            . input('assigned_user_email', mssql.VarChar, assigned_user_email)
            .execute('getProject')).recordset
          
            return res.json(getproject)
        } catch (error) {
            res.json({error})
        }
        
        }

        export const completeProjects = async(req: Extended, res: Response)=>{
            try {
                const pool=await mssql.connect(sqlConfig)
                const {project_id}= req.body
                const {error , value}= UserSchema6.validate(req.body)
                if(error){
                    return res.json({error:error.details[0].message})
                }
                const cproject:Project[]=await( await pool.request()
                . input('project_id', mssql.VarChar, project_id)
                .execute('completeProject')).recordset
              
                res.json(cproject)
            } catch (error) {
                res.json({error})
            }
            
            }