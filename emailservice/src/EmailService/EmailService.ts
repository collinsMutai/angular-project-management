import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/Config'
dotenv.config()
import sendMail from '../Helpers/Email'
interface Task{
    id:number
    name:string
    description:string,
    end_date:string,
    email: string,
    issent:string
}


const SendEmails= async()=>{
const pool = await mssql.connect(sqlConfig)
const tasks:Task[]= await(await pool.request().query(`
SELECT email FROM UsersTable u INNER JOIN projectsTable p ON p.user_id =User_Id`)).recordset
console.log(tasks);



 for(let task of tasks){

    ejs.renderFile('templates/registration.ejs',{name:task.name,task:task.description} ,async(error,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:task.email,
            subject:"Jitu Project Task",
            html:data,
            attachments:[
                {
                    filename:'task.txt',
                    content:`You have been assigned a task : ${task.description}`
                }
            ]
        }

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE projectsTable SET issent='1' WHERE id = ${task.id}`)
            console.log('Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}

export default SendEmails