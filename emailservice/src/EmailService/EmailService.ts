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
    issent:string,
    user_id:string,
    project_id:string
}


const SendEmails= async()=>{
const pool = await mssql.connect(sqlConfig)
const tasks:Task[]= await(await pool.request().query(`
SELECT email FROM UsersTable u INNER JOIN projectsTable p ON p.user_id =User_Id WHERE user_id IS NOT NULL AND issent=0`)).recordset
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
            await  pool.request().query(`UPDATE ProjectsTable SET issent=1 WHERE issent=0`)
            console.log('Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}

export default SendEmails