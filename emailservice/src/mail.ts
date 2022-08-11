import express from 'express'
import cron from 'node-cron'
import SendEmails from './EmailService/EmailService'
const app = express()

const run =()=>{
    cron.schedule('*/5 * * * *', async()=>{
        console.log('cron is running');
        await SendEmails()
        
    })
}
run()

app.listen(3000, ()=>{
    console.log('Email service is running');
    
})