import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/Config'
dotenv.config()
import sendMail from '../Helpers/Email'
interface user{
    id:number
    name:string
    description:string,
    end_date:string,
    email: string,
    issent:string,
    status:string
}


const RegisterEmail= async()=>{
const pool = await mssql.connect(sqlConfig)
const users:user[]= await(await pool.request().query(`
SELECT * FROM UsersTable WHERE status='0'`)).recordset
console.log(users);



 for(let user of users){

    ejs.renderFile('templates/registeremail.ejs',{name:user.name} ,async(error,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:user.email,
            subject:"Welcome to The Jitu",
            html:data,
            attachments:[
                {
                    filename:'user.text',
                    content:`Welcome newsletter : ${user.name}`
                }
            ]
        }

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE UsersTable SET status='1' WHERE id = '${user.id}'`)
            console.log('Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}

export default RegisterEmail