import nodemailer from 'nodemailer'
export const sendEmail=async({to,subject,html})=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"ayatabdelrhman514@gmail.com",
            pass:"joym jtso anha pspj"
        }
    })
   await transporter.sendMail({
    to,
    from:"'<orthoAi>'ayatabdelrhman514@gmail.com ",
    subject,
    html
   })
}