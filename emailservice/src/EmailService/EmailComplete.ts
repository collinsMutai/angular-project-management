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
    project_id:string,
    assigned_user_email:string
}


const SendCompleteEmails= async()=>{
const pool = await mssql.connect(sqlConfig)
const tasks:Task[]= await(await pool.request().query(`
SELECT email FROM UsersTable u INNER JOIN projectsTable p ON p.assigned_user_email =Email WHERE assigned_user_email IS NOT NULL AND completed=1`)).recordset
console.log(tasks);



 for(let task of tasks){

    ejs.renderFile('templates/completedmail.ejs',{name:task.name,task:task.description} ,async(error,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:task.email,
            subject:"Completed Jitu Project Task",
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
            await  pool.request().query(`UPDATE ProjectsTable SET issent=0 WHERE issent=1`)
            console.log('Complete Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}

export default SendCompleteEmails