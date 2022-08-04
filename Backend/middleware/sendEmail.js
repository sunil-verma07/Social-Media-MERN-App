import { createTransport } from "nodemailer"

export const sendEmail=(options)=>{

    const transporter = createTransport({

        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9a6c733545c362",
          pass: "3832a26ed853c8"
        }
    })


    const mailOptions ={
        from : "9a6c733545c362",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions)

}