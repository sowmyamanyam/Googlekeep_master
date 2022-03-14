const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
const sendgridTransport = require('nodemailer-sendgrid-transport');
const sendEmail=(user,token)=>{
    const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key:process.env.API_KEY
              
          }
        })
      );
  transporter.sendMail({
        to: user.email,
        from: 'ravimaddi18@gmail.com',
        subject: 'Password reset',
        html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="https://ravi-keep.herokuapp.com/api/reset-pass/${token}">link</a> to set a new password.</p>
        `
      })
    
}

module.exports=sendEmail