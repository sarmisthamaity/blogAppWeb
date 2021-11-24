require('dotenv').config()
const nodeMailer = require('nodemailer');

// const transporter = nodeMailer.createTransport({
//     service: 'Gmail',
//     host: 'smtp.gmail.com',
//     port: 2525,
//     secure: false,
//     requireTLS: true,
//     auth: {
//         user: 'sarmistha20@navgurukul.org',
//         pass: process.env.PASSWORD
//     }
// });



const mailSender = (to, subject, text) => {
    return new Promise((resolve, reject) =>{
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            // host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'infistack111@gmail.com',
                pass: 'infi@111'
            }
        });

        const mailData = {
            from: "infistack111@gmail.com",
            to: to,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailData, (err, info) => {
            if(err){
                reject(err)
            } else {
                resolve(info)
            };
        });

    });
};


module.exports = {
    mailSender
};