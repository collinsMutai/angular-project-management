import express from 'express'
import cron from 'node-cron'
import SendCompleteEmails from './EmailService/EmailComplete'
import SendEmails from './EmailService/EmailService'
import RegisterEmail from './EmailService/RegisterService'
const app = express()

const run =()=>{
    cron.schedule('* * * * *', async()=>{
        console.log('cron is running');
        await SendEmails()
        await RegisterEmail()
        await SendCompleteEmails()
        
    })
}
run()

app.listen(3000, ()=>{
    console.log('Email service is running');
    
})